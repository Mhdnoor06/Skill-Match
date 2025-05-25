import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });

    // Get the current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get the request body
    const body = await request.json();
    const {
      fullName,
      profilePicture,
      socialLinks,
      teachingSkills,
      learningSkills,
      availability,
      bio,
    } = body;

    // Update the profile
    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        full_name: fullName,
        avatar_url: profilePicture,
        bio,
        onboarding_completed: true,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    if (updateError) {
      console.error("Error updating profile:", updateError);
      return NextResponse.json(
        { error: "Failed to update profile" },
        { status: 500 }
      );
    }

    // Update social links - first delete existing ones for this user
    if (socialLinks) {
      // Delete existing social links for this user
      const { error: deleteError } = await supabase
        .from("social_links")
        .delete()
        .eq("user_id", user.id);

      if (deleteError) {
        console.error("Error deleting existing social links:", deleteError);
        return NextResponse.json(
          { error: "Failed to update social links" },
          { status: 500 }
        );
      }

      // Insert new social links if any
      if (socialLinks.length > 0) {
        const { error: insertError } = await supabase
          .from("social_links")
          .insert(
            socialLinks.map((link: any) => ({
              user_id: user.id,
              platform: link.platform,
              url: link.url,
            }))
          );

        if (insertError) {
          console.error("Error inserting social links:", insertError);
          return NextResponse.json(
            { error: "Failed to update social links" },
            { status: 500 }
          );
        }
      }
    }

    // Update skills using upsert
    const allSkills = [
      ...(teachingSkills || []).map((skill: any) => ({
        user_id: user.id,
        skill_name: skill.name,
        skill_type: "teaching",
        proficiency_level: skill.level || "beginner",
      })),
      ...(learningSkills || []).map((skill: any) => ({
        user_id: user.id,
        skill_name: skill.name,
        skill_type: "learning",
        proficiency_level: skill.level || "beginner",
      })),
    ];

    if (allSkills.length > 0) {
      const { error: skillsError } = await supabase
        .from("user_skills")
        .upsert(allSkills, {
          onConflict: "user_id,skill_name,skill_type",
          ignoreDuplicates: false,
        });

      if (skillsError) {
        console.error("Error updating skills:", skillsError);
        return NextResponse.json(
          { error: "Failed to update skills" },
          { status: 500 }
        );
      }
    }

    // Update availability slots
    if (availability && availability.length > 0) {
      // Delete existing availability slots for this user
      const { error: deleteError } = await supabase
        .from("availability_slots")
        .delete()
        .eq("user_id", user.id);

      if (deleteError) {
        console.error(
          "Error deleting existing availability slots:",
          deleteError
        );
        return NextResponse.json(
          { error: "Failed to update availability" },
          { status: 500 }
        );
      }

      // Insert new availability slots
      const { error: insertError } = await supabase
        .from("availability_slots")
        .insert(
          availability.map((slot: any) => ({
            user_id: user.id,
            days: [slot.day], // Convert single day to array as per schema
            start_time: slot.startTime,
            end_time: slot.endTime,
          }))
        );

      if (insertError) {
        console.error("Error inserting availability slots:", insertError);
        return NextResponse.json(
          { error: "Failed to update availability" },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in profile update:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
