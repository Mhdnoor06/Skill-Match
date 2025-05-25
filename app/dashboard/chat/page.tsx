"use client";

import { useState, useRef, useEffect } from "react";
import {
  ArrowLeft,
  Send,
  Phone,
  Video,
  MoreVertical,
  Search,
  Check,
  CheckCheck,
  Clock,
  X,
  UserPlus,
  MessageCircle,
} from "lucide-react";

type ConnectionStatus = "connected" | "pending" | "rejected";
type MessageStatus = "sent" | "delivered" | "read";

interface Message {
  id: string;
  text: string;
  sender: "me" | "other";
  timestamp: Date;
  status?: MessageStatus;
}

interface Contact {
  id: string;
  name: string;
  avatar: string;
  lastMessage?: string;
  lastMessageTime?: Date;
  unreadCount: number;
  isOnline: boolean;
  connectionStatus: ConnectionStatus;
  skills: string[];
  isTyping?: boolean;
}

const mockContacts: Contact[] = [
  {
    id: "1",
    name: "Sarah Chen",
    avatar: "",
    lastMessage: "Thanks for the JavaScript tips! Really helpful 🙏",
    lastMessageTime: new Date(Date.now() - 5 * 60 * 1000),
    unreadCount: 2,
    isOnline: true,
    connectionStatus: "connected",
    skills: ["JavaScript", "React", "Node.js"],
    isTyping: false,
  },
  {
    id: "2",
    name: "Alex Rodriguez",
    avatar: "",
    lastMessage: "Let's schedule our Python session for tomorrow",
    lastMessageTime: new Date(Date.now() - 30 * 60 * 1000),
    unreadCount: 0,
    isOnline: true,
    connectionStatus: "connected",
    skills: ["Python", "Django", "Machine Learning"],
  },
  {
    id: "3",
    name: "Emma Wilson",
    avatar: "",
    lastMessage: "Connection request sent",
    lastMessageTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
    unreadCount: 0,
    isOnline: false,
    connectionStatus: "pending",
    skills: ["UI/UX Design", "Figma", "Adobe XD"],
  },
  {
    id: "4",
    name: "Michael Kim",
    avatar: "",
    lastMessage: "Great session on data structures!",
    lastMessageTime: new Date(Date.now() - 24 * 60 * 60 * 1000),
    unreadCount: 1,
    isOnline: false,
    connectionStatus: "connected",
    skills: ["Java", "Spring Boot", "Algorithms"],
  },
  {
    id: "5",
    name: "Lisa Park",
    avatar: "",
    lastMessage: "Connection declined",
    lastMessageTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    unreadCount: 0,
    isOnline: false,
    connectionStatus: "rejected",
    skills: ["DevOps", "AWS", "Docker"],
  },
];

const mockMessages: Record<string, Message[]> = {
  "1": [
    {
      id: "1",
      text: "Hey! I saw you're learning JavaScript. I'd love to help you out!",
      sender: "other",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
    {
      id: "2",
      text: "That would be amazing! I'm struggling with async/await concepts.",
      sender: "me",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000 + 5 * 60 * 1000),
      status: "read",
    },
    {
      id: "3",
      text: "Perfect! Let me share some resources and we can go through examples together.",
      sender: "other",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000 + 10 * 60 * 1000),
    },
    {
      id: "4",
      text: "Thanks for the JavaScript tips! Really helpful 🙏",
      sender: "other",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
    },
    {
      id: "5",
      text: "You're welcome! Let me know if you need help with anything else.",
      sender: "me",
      timestamp: new Date(Date.now() - 4 * 60 * 1000),
      status: "read",
    },
    {
      id: "6",
      text: "Actually, I have a question about React hooks. Can you help?",
      sender: "other",
      timestamp: new Date(Date.now() - 3 * 60 * 1000),
    },
    {
      id: "7",
      text: "Of course! What specifically are you struggling with?",
      sender: "me",
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      status: "read",
    },
    {
      id: "8",
      text: "I'm having trouble understanding useEffect and its dependencies.",
      sender: "other",
      timestamp: new Date(Date.now() - 1 * 60 * 1000),
    },
  ],
  "2": [
    {
      id: "1",
      text: "Hi Alex! Ready for our Python learning session?",
      sender: "me",
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      status: "read",
    },
    {
      id: "2",
      text: "I've prepared some Django examples for you.",
      sender: "other",
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
    },
    {
      id: "3",
      text: "Let's schedule our Python session for tomorrow",
      sender: "other",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
    },
  ],
};

export default function ChatPage() {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileView, setIsMobileView] = useState(false);
  const [showChatOnMobile, setShowChatOnMobile] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobileView(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setShowChatOnMobile(false);
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (selectedContact && mockMessages[selectedContact.id]) {
      setMessages(mockMessages[selectedContact.id]);
    }
  }, [selectedContact]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact);
    if (isMobileView) {
      setShowChatOnMobile(true);
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedContact) return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: "me",
      timestamp: new Date(),
      status: "sent",
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage("");

    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === message.id ? { ...msg, status: "delivered" } : msg
        )
      );
    }, 1000);

    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === message.id ? { ...msg, status: "read" } : msg
        )
      );
    }, 3000);
  };

  const handleBackToContacts = () => {
    setShowChatOnMobile(false);
    setSelectedContact(null);
  };

  const filteredContacts = mockContacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return "now";
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    if (days < 7) return `${days}d`;
    return date.toLocaleDateString();
  };

  const getMessageStatusIcon = (status?: MessageStatus) => {
    switch (status) {
      case "sent":
        return <Check className="h-3 w-3 text-gray-400" />;
      case "delivered":
        return <CheckCheck className="h-3 w-3 text-gray-400" />;
      case "read":
        return <CheckCheck className="h-3 w-3 text-blue-500" />;
      default:
        return null;
    }
  };

  const getConnectionStatusBadge = (status: ConnectionStatus) => {
    const baseClasses =
      "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case "connected":
        return (
          <span
            className={`${baseClasses} bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400`}
          >
            Connected
          </span>
        );
      case "pending":
        return (
          <span
            className={`${baseClasses} bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400`}
          >
            Pending
          </span>
        );
      case "rejected":
        return (
          <span
            className={`${baseClasses} bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400`}
          >
            Declined
          </span>
        );
    }
  };

  const getConnectionIcon = (status: ConnectionStatus) => {
    switch (status) {
      case "connected":
        return <MessageCircle className="h-4 w-4" />;
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "rejected":
        return <X className="h-4 w-4" />;
    }
  };

  const ContactsList = () => (
    <div className="flex flex-col h-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl">
      <div className="p-4 border-b border-gray-200/50 dark:border-zinc-800/50 flex-shrink-0">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Messages
        </h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50/50 dark:bg-zinc-800/50 border border-gray-200/50 dark:border-zinc-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="divide-y divide-gray-200/30 dark:divide-zinc-800/30">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => handleContactSelect(contact)}
              className={`flex items-center gap-4 p-4 cursor-pointer transition-all duration-200 hover:bg-gray-100/50 dark:hover:bg-zinc-800/50 active:bg-gray-200/50 dark:active:bg-zinc-700/50 ${
                selectedContact?.id === contact.id && !isMobileView
                  ? "bg-blue-50 dark:bg-blue-900/20 border-r-2 border-blue-500"
                  : ""
              }`}
            >
              <div className="relative flex-shrink-0">
                <div className="h-14 w-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                  {contact.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                {contact.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-zinc-900 rounded-full"></div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white truncate text-lg">
                    {contact.name}
                  </h3>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {contact.lastMessageTime &&
                        formatTime(contact.lastMessageTime)}
                    </span>
                    {contact.unreadCount > 0 && (
                      <span className="h-6 w-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">
                        {contact.unreadCount}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mb-3">
                  {contact.connectionStatus === "connected" ? (
                    <p className="text-gray-600 dark:text-gray-400 truncate">
                      {contact.isTyping ? (
                        <span className="text-blue-500 italic">typing...</span>
                      ) : (
                        contact.lastMessage
                      )}
                    </p>
                  ) : contact.connectionStatus === "pending" ? (
                    <p className="text-amber-600 dark:text-amber-400 font-medium">
                      Connection request sent
                    </p>
                  ) : (
                    <p className="text-red-600 dark:text-red-400 font-medium">
                      Connection declined
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap gap-1">
                  {contact.skills.slice(0, 2).map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-2 py-1 bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                  {contact.skills.length > 2 && (
                    <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded">
                      +{contact.skills.length - 2}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ChatArea = () => {
    if (!selectedContact) {
      return (
        <div className="flex-1 flex items-center justify-center bg-gray-50/50 dark:bg-zinc-900/50">
          <div className="text-center">
            <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Select a conversation
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Choose a contact to start messaging
            </p>
          </div>
        </div>
      );
    }

    if (selectedContact.connectionStatus !== "connected") {
      return (
        <div className="flex-1 flex items-center justify-center bg-gray-50/50 dark:bg-zinc-900/50 relative">
          <div className="text-center max-w-md mx-auto p-6">
            {isMobileView && (
              <div className="absolute top-4 left-4">
                <button
                  onClick={handleBackToContacts}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
              </div>
            )}
            {selectedContact.connectionStatus === "pending" ? (
              <>
                <Clock className="h-16 w-16 text-amber-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Connection Pending
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Your connection request to {selectedContact.name} is pending
                  approval.
                </p>
                <button className="px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors">
                  <UserPlus className="h-4 w-4 mr-2 inline" />
                  Send Reminder
                </button>
              </>
            ) : (
              <>
                <X className="h-16 w-16 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Connection Declined
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {selectedContact.name} declined your connection request.
                </p>
                <button
                  onClick={handleBackToContacts}
                  className="px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
                >
                  Back to Messages
                </button>
              </>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col h-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl">
        {/* Fixed Chat Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200/50 dark:border-zinc-800/50 flex-shrink-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            {isMobileView && (
              <button
                onClick={handleBackToContacts}
                className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors flex-shrink-0"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            )}
            <div className="relative flex-shrink-0">
              <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                {selectedContact.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              {selectedContact.isOnline && (
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white dark:border-zinc-900 rounded-full"></div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                {selectedContact.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                {selectedContact.isOnline
                  ? "Online"
                  : `Last seen ${formatTime(
                      selectedContact.lastMessageTime || new Date()
                    )}`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors">
              <Phone className="h-5 w-5" />
            </button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors">
              <Video className="h-5 w-5" />
            </button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors">
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Messages Area */}
        <div className="flex-1 overflow-y-auto min-h-0 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "me" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                    message.sender === "me"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <div
                    className={`flex items-center gap-1 mt-1 ${
                      message.sender === "me" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <span
                      className={`text-xs ${
                        message.sender === "me"
                          ? "text-blue-100"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    {message.sender === "me" &&
                      getMessageStatusIcon(message.status)}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Fixed Message Input */}
        <div className="p-4 border-t border-gray-200/50 dark:border-zinc-800/50 flex-shrink-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1 px-3 py-2 bg-gray-50/50 dark:bg-zinc-800/50 border border-gray-200/50 dark:border-zinc-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (isMobileView) {
    return (
      <div className="h-[calc(100vh-8rem)] bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-xl overflow-hidden border border-gray-200/50 dark:border-zinc-800/50 shadow-lg">
        {!showChatOnMobile ? <ContactsList /> : <ChatArea />}
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex rounded-xl overflow-hidden border border-gray-200/50 dark:border-zinc-800/50 shadow-lg">
      <div className="w-80 flex-shrink-0 border-r border-gray-200/50 dark:border-zinc-800/50">
        <ContactsList />
      </div>
      <div className="flex-1 min-w-0">
        <ChatArea />
      </div>
    </div>
  );
}
