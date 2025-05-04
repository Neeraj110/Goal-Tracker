/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import React, { useState, useEffect } from "react";
import {
  BarChart3,
  Calendar,
  CheckCircle2,
  ChevronUp,
  Clock,
  Edit,
  Github,
  Goal,
  Home,
  LogOut,
  Menu,
  MessageSquare,
  Moon,
  Plus,
  Settings,
  Sun,
  Target,
  Trash,
  Trophy,
  Twitter,
  User,
} from "lucide-react";
import Image from "next/image";

type AppUser = {
  id: string;
  name: string;
  avatar: string;
  role: string;
};

type Comment = {
  id: string;
  userId: string;
  text: string;
  createdAt: string;
};

type Milestone = {
  id: string;
  title: string;
  isCompleted: boolean;
  completedAt?: string;
};

type Goal = {
  id: string;
  title: string;
  description: string;
  category: "personal" | "project" | "team";
  progress: number;
  dueDate: string;
  ownerId: string;
  teamMembers: string[];
  milestones: Milestone[];
  comments: Comment[];
  isCompleted: boolean;
  completedAt?: string;
  color: string;
  createdAt: string;
};

const mockUsers: AppUser[] = [
  {
    id: "user1",
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Product Manager",
  },
  {
    id: "user2",
    name: "Sam Taylor",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "UX Designer",
  },
  {
    id: "user3",
    name: "Jordan Lee",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Developer",
  },
  {
    id: "user4",
    name: "Casey Morgan",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Marketing",
  },
];

export const mockGoals: Goal[] = [
  {
    id: "goal1",
    title: "Complete Website Redesign",
    description:
      "Redesign the company website with improved UX and modern design principles",
    category: "team",
    progress: 75,
    dueDate: "2025-06-15",
    createdAt: "2025-03-01",
    ownerId: "user1",
    teamMembers: ["user1", "user2", "user3"],
    comments: [
      {
        id: "comment1",
        userId: "user2",
        text: "The new homepage design looks great! I've added some animations to improve user engagement.",
        createdAt: "2025-05-10T14:30:00Z",
      },
      {
        id: "comment2",
        userId: "user3",
        text: "I've completed the responsive layouts for mobile devices. Ready for testing!",
        createdAt: "2025-05-12T09:15:00Z",
      },
    ],
    milestones: [
      {
        id: "milestone1",
        title: "Design mockups approved",
        isCompleted: true,
        completedAt: "2025-04-10",
      },
      {
        id: "milestone2",
        title: "Frontend implementation",
        isCompleted: true,
        completedAt: "2025-05-05",
      },
      {
        id: "milestone3",
        title: "Content migration",
        isCompleted: false,
        completedAt: "2025-05-20",
      },
      {
        id: "milestone4",
        title: "Launch website",
        isCompleted: false,
        completedAt: "2025-06-15",
      },
    ],
    isCompleted: false,
    color: "bg-blue-500",
  },
  {
    id: "goal2",
    title: "Increase Conversion Rate by 15%",
    description:
      "Optimize the sales funnel to improve conversion rates across all channels",
    category: "team",
    progress: 40,
    dueDate: "2025-07-30",
    createdAt: "2025-04-15",
    ownerId: "user4",
    teamMembers: ["user1", "user4"],
    comments: [
      {
        id: "comment3",
        userId: "user1",
        text: "We should focus on improving the checkout process first, that's where we're seeing the highest drop-off.",
        createdAt: "2025-04-20T11:45:00Z",
      },
    ],
    milestones: [
      {
        id: "milestone5",
        title: "Analytics setup",
        isCompleted: true,
        completedAt: "2025-04-25",
      },
      {
        id: "milestone6",
        title: "A/B testing implementation",
        isCompleted: true,
        completedAt: "2025-05-10",
      },
      {
        id: "milestone7",
        title: "Checkout optimization",
        isCompleted: false,
        completedAt: "2025-06-15",
      },
    ],
    isCompleted: false,
    color: "bg-purple-500",
  },
  {
    id: "goal3",
    title: "Learn React Server Components",
    description:
      "Master the concepts and implementation of React Server Components for better app performance",
    category: "personal",
    progress: 60,
    dueDate: "2025-05-30",
    createdAt: "2025-04-01",
    ownerId: "user3",
    teamMembers: ["user3"],
    comments: [],
    milestones: [
      {
        id: "milestone8",
        title: "Complete documentation reading",
        isCompleted: true,
        completedAt: "2025-04-15",
      },
      {
        id: "milestone9",
        title: "Build sample application",
        isCompleted: true,
        completedAt: "2025-05-01",
      },
      {
        id: "milestone10",
        title: "Implement in production project",
        isCompleted: false,
        completedAt: "2025-05-30",
      },
    ],
    isCompleted: false,
    color: "bg-green-500",
  },
  {
    id: "goal4",
    title: "Launch Mobile App v2.0",
    description:
      "Release version 2.0 of our mobile app with new features and performance improvements",
    category: "project",
    progress: 90,
    dueDate: "2025-05-20",
    createdAt: "2025-02-15",
    ownerId: "user1",
    teamMembers: ["user1", "user2", "user3", "user4"],
    comments: [
      {
        id: "comment4",
        userId: "user3",
        text: "All critical bugs have been fixed. We're ready for final QA testing.",
        createdAt: "2025-05-10T16:20:00Z",
      },
      {
        id: "comment5",
        userId: "user4",
        text: "Marketing materials are ready for the launch. Press release scheduled for the 19th.",
        createdAt: "2025-05-12T10:30:00Z",
      },
    ],
    milestones: [
      {
        id: "milestone11",
        title: "Feature development complete",
        isCompleted: true,
        completedAt: "2025-04-10",
      },
      {
        id: "milestone12",
        title: "Internal testing",
        isCompleted: true,
        completedAt: "2025-04-25",
      },
      {
        id: "milestone13",
        title: "Beta testing",
        isCompleted: true,
        completedAt: "2025-05-05",
      },
      {
        id: "milestone14",
        title: "App store submission",
        isCompleted: false,
        completedAt: "2025-05-15",
      },
    ],
    isCompleted: false,
    color: "bg-orange-500",
  },
  {
    id: "goal5",
    title: "Improve Team Communication",
    description:
      "Implement new processes and tools to enhance team communication and collaboration",
    category: "team",
    progress: 100,
    dueDate: "2025-04-30",
    createdAt: "2025-03-15",
    ownerId: "user1",
    teamMembers: ["user1", "user2", "user3", "user4"],
    comments: [
      {
        id: "comment6",
        userId: "user2",
        text: "The new daily standup format is working really well!",
        createdAt: "2025-04-10T09:00:00Z",
      },
      {
        id: "comment7",
        userId: "user4",
        text: "Documentation templates have been a game-changer for our knowledge sharing.",
        createdAt: "2025-04-25T14:15:00Z",
      },
    ],
    milestones: [
      {
        id: "milestone15",
        title: "Communication audit",
        isCompleted: true,
        completedAt: "2025-03-25",
      },
      {
        id: "milestone16",
        title: "Tool selection and implementation",
        isCompleted: true,
        completedAt: "2025-04-10",
      },
      {
        id: "milestone17",
        title: "Team training",
        isCompleted: true,
        completedAt: "2025-04-20",
      },
      {
        id: "milestone18",
        title: "Process documentation",
        isCompleted: true,
        completedAt: "2025-04-28",
      },
    ],
    isCompleted: true,
    completedAt: "2025-04-28",
    color: "bg-teal-500",
  },
];

function GaolTracker() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeView, setActiveView] = useState<
    "landing" | "dashboard" | "goal"
  >("landing");
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [currentUser, setCurrentUser] = useState<AppUser>(mockUsers[0]);
  const [goals, setGoals] = useState<Goal[]>(mockGoals);
  const [filterCategory, setFilterCategory] = useState<
    "all" | "personal" | "team" | "project"
  >("all");
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(mockGoals[0]);
  const [newComment, setNewComment] = useState("");
  const [newGoalModal, setNewGoalModal] = useState(false);
  const [newGoalData, setNewGoalData] = useState<{
    milestone: string | number | readonly string[] | undefined;
    title: string;
    description: string;
    category: string;
    dueDate: string;
    Milestones: Milestone[];
    teamMembers: string[];
    color: string;
  }>({
    milestone: "",
    title: "",
    description: "",
    category: "",
    dueDate: "",
    Milestones: [],
    teamMembers: [],
    color: "",
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleDarkModeToggle = () => {
    setIsDarkMode((prev) => !prev);
  };

  const filteredGaols =
    filterCategory === "all"
      ? goals
      : goals.filter((goal) => goal.category === filterCategory);

  const totalGoals = goals.length;
  const completedGoals = goals.filter((goal) => goal.isCompleted).length;
  const completionRate =
    totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;

  const upcomingDeadlines = goals
    .filter((goal) => !goal.isCompleted && new Date(goal.dueDate) > new Date())
    .sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    )
    .slice(0, 3);

  const handleGoalClick = (goal: Goal) => {
    setSelectedGoal(goal);
    setActiveView("goal");
  };

  const getUserById = (id: string) => {
    return mockUsers.find((user) => user.id === id) || mockUsers[0];
  };

  const handleNewGoalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalData.title.trim()) return;
    const newGoal: Goal = {
      id: `goal-${Date.now()}`,
      title: newGoalData.title,
      description: newGoalData.description,
      category: newGoalData.category as "personal" | "project" | "team",
      progress: 0,
      dueDate: newGoalData.dueDate,
      createdAt: new Date().toISOString(),
      ownerId: currentUser.id,
      teamMembers: newGoalData.teamMembers,
      milestones: newGoalData.Milestones.map((m: Milestone) => ({
        ...m,
        isCompleted: false,
        completedAt: undefined,
      })),
      comments: [],
      isCompleted: false,
      color: newGoalData.color || "bg-gray-500",
    };
    setGoals((prev) => [...prev, newGoal]);
    setNewGoalModal(false);
    setNewGoalData({
      milestone: "",
      title: "",
      description: "",
      category: "",
      dueDate: "",
      Milestones: [],
      teamMembers: [],
      color: "",
    });
  };

  const handleDeleteGoal = (goalId: string) => {
    setGoals((prev) => prev.filter((goal) => goal.id !== goalId));
    if (selectedGoal && selectedGoal.id === goalId) {
      setSelectedGoal(null);
      setActiveView("dashboard");
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!newComment.trim()) return;
      const newCommentData: Comment = {
        id: `comment-${Date.now()}`,
        userId: currentUser.id,
        text: newComment,
        createdAt: new Date().toISOString(),
      };
      setSelectedGoal((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          comments: [...prev.comments, newCommentData],
        };
      });
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleToggleMilestone = (milestoneId: string) => {
    if (!selectedGoal) return;

    const updatedGoals = goals.map((goal) => {
      if (goal.id === selectedGoal.id) {
        const updatedMilestones = goal.milestones.map((milestone) => {
          if (milestone.id === milestoneId) {
            return {
              ...milestone,
              isCompleted: !milestone.isCompleted,
              completedAt: milestone.isCompleted
                ? undefined
                : new Date().toISOString(),
            };
          }
          return milestone;
        });

        const totalMilestones = updatedMilestones.length;
        const completedMilestones = updatedMilestones.filter(
          (m) => m.isCompleted
        ).length;
        const newProgress =
          totalMilestones > 0
            ? Math.round((completedMilestones / totalMilestones) * 100)
            : goal.progress;

        const updatedGoal = {
          ...goal,
          milestones: updatedMilestones,
          progress: newProgress,
          isCompleted: newProgress === 100,
          completedAt:
            newProgress === 100
              ? new Date().toISOString().split("T")[0]
              : goal.completedAt,
        };

        setSelectedGoal(updatedGoal);
        return updatedGoal;
      }
      return goal;
    });

    setGoals(updatedGoals);
  };

  const handleAddMilestone = () => {
    const { Milestones } = newGoalData;

    const hasEmptyMilestone = Milestones.some((m) => m.title.trim() === "");

    if (hasEmptyMilestone) {
      alert("Please fill in all milestone titles before adding a new one.");
      return;
    }

    const newMilestone = {
      id: Date.now().toString(),
      title: "",
      isCompleted: false,
    };

    setNewGoalData((prev) => ({
      ...prev,
      Milestones: [...prev.Milestones, newMilestone],
    }));
  };

  const handleMilestoneTitleChange = (index: number, value: string) => {
    const updatedMilestones = [...newGoalData.Milestones];
    updatedMilestones[index].title = value;
    setNewGoalData((prev) => ({
      ...prev,
      Milestones: updatedMilestones,
    }));
  };

  const handleRemoveMilestone = (index: number) => {
    const updatedMilestones = newGoalData.Milestones.filter(
      (_, i) => i !== index
    );
    setNewGoalData((prev) => ({
      ...prev,
      Milestones: updatedMilestones,
    }));
  };

  return (
    <div className={`min-h-screen flex flex-col`}>
      {/* Navbar*/}
      <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Target className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                GoalTracker
              </span>

              <div className="hidden md:flex md:space-x-8 md:ml-6 ">
                <button
                  onClick={() => setActiveView("landing")}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-all duration-300 ease-in-out ${
                    activeView === "landing"
                      ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  <Home className="mr-1 h-4 w-4" />
                  Home
                </button>
                <button
                  onClick={() => setActiveView("dashboard")}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-all duration-300 ease-in ${
                    activeView === "dashboard" || activeView === "goal"
                      ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  <BarChart3 className="mr-1 h-4 w-4" />
                  Dashboard
                </button>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleDarkModeToggle}
                className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800
                transition-all duration-300 ease-in-out"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
              <div className="ml-3 relative">
                <div className="flex items-center">
                  <button
                    onClick={() => setIsNavOpen(!isNavOpen)}
                    className="flex items-center gap-1 text-sm rounded-full focus:outline-none  focus:ring-2 focus:ring-blue-500"
                  >
                    <Image
                      className="h-8 w-8 rounded-full"
                      src={`https://ui-avatars.com/api/?name=Alex+john&background=random`.trim()}
                      alt={currentUser.name}
                      width={40}
                      height={40}
                    />

                    <span className="ml-2 hidden md:block text-gray-700 dark:text-gray-300">
                      {currentUser.name}
                    </span>
                  </button>
                </div>
                {isNavOpen && (
                  <div className="absolute origin-top-right right-0 mt-3 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5  z-50">
                    <div className="py-1">
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <User className="inline-block mr-2 h-4 w-4" />
                        Profile
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <Settings className="inline-block mr-2 h-4 w-4" />
                        Settings
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <LogOut className="inline-block mr-2 h-4 w-4" />
                        Sign out
                      </a>
                    </div>
                  </div>
                )}
              </div>
              <div className="ml-3 md:hidden">
                <button
                  onClick={() => setIsMobileView(!isMobileView)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2  focus:ring-blue-500"
                >
                  <Menu className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {isMobileView && (
          <div className="md:hidden ">
            <div className="flex items-center gap-5 px-4 ">
              <button
                onClick={() => setActiveView("landing")}
                className={`block px-4 py-2 text-sm font-medium transition-all duration-300 ease-in-out ${
                  activeView === "landing"
                    ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                <Home className="inline-block mr-1 h-4 w-4" />
                Home
              </button>
              <button
                onClick={() => setActiveView("dashboard")}
                className={`block px-4 py-2 text-sm font-medium transition-all duration-300 ease-in-out ${
                  activeView === "dashboard" || activeView === "goal"
                    ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                <BarChart3 className=" inline-block mr-1 h-4 w-4" />
                Dashboard
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main content area */}
      <main className="flex-grow bg-gray-50 dark:bg-gray-900">
        {activeView === "landing" && (
          <div className="relative">
            {/*Hero Section*/}
            <section className="relative py-20 overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                  <h1 className="text-4xl font-extrabold tracking-tight text-gray-950 dark:text-white sm:text-5xl md:text-6xl">
                    <span className="block">Track Your Goals,</span>
                    <span className="text-blue-600 dark:text-blue-400">
                      Achieve Your Dreams
                    </span>
                  </h1>
                  <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                    Set personal and team goals, track progress, and celebrate
                    achievements together. GoalTracker helps you stay focused
                    and motivated.
                  </p>
                  <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                    <div className="rounded-md shadow">
                      <button
                        onClick={() => setActiveView("dashboard")}
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                      >
                        Get Started
                      </button>
                    </div>
                    <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                      <a
                        href="#"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                      >
                        Learn More
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-16 bg-white dark:bg-gray-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                  <h2 className="text-base font-semibold text-blue-600 dark:text-blue-400 tracking-wide uppercase">
                    Features
                  </h2>
                  <p className="mt-1 text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight">
                    Everything you need to succeed
                  </p>
                  <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500 dark:text-gray-400">
                    Our comprehensive goal tracking system helps individuals and
                    teams stay organized and motivated.
                  </p>
                </div>

                <div className="mt-12">
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="pt-6">
                      <div className="flow-root bg-gray-50 dark:bg-gray-900 rounded-lg px-6 pb-8">
                        <div className="-mt-6">
                          <div>
                            <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                              <Target className="h-6 w-6 text-white" />
                            </span>
                          </div>
                          <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-white tracking-tight">
                            Goal Setting
                          </h3>
                          <p className="mt-5 text-base text-gray-500 dark:text-gray-400">
                            Create personal or team goals with detailed
                            descriptions, due dates, and milestones to track
                            progress.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6">
                      <div className="flow-root bg-gray-50 dark:bg-gray-900 rounded-lg px-6 pb-8">
                        <div className="-mt-6">
                          <div>
                            <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                              <BarChart3 className="h-6 w-6 text-white" />
                            </span>
                          </div>
                          <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-white tracking-tight">
                            Progress Tracking
                          </h3>
                          <p className="mt-5 text-base text-gray-500 dark:text-gray-400">
                            Visualize your progress with interactive progress
                            bars and milestone tracking to stay motivated.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6">
                      <div className="flow-root bg-gray-50 dark:bg-gray-900 rounded-lg px-6 pb-8">
                        <div className="-mt-6">
                          <div>
                            <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                              <MessageSquare className="h-6 w-6 text-white" />
                            </span>
                          </div>
                          <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-white tracking-tight">
                            Collaboration
                          </h3>
                          <p className="mt-5 text-base text-gray-500 dark:text-gray-400">
                            Comment on goals, provide feedback, and work
                            together with your team to achieve shared
                            objectives.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 bg-gray-50 dark:bg-gray-900 overflow-hidden">
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                  <h2 className="text-base font-semibold text-blue-600 dark:text-blue-400 tracking-wide uppercase">
                    Testimonials
                  </h2>
                  <p className="mt-1 text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight">
                    Loved by teams everywhere
                  </p>
                </div>
                <div className="mt-12">
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                      <p className="text-gray-500 dark:text-gray-400">
                        GoalTracker has transformed how our team collaborates on
                        projects. The visual progress tracking keeps everyone
                        motivated and accountable.
                      </p>
                      <div className="mt-6 flex items-center">
                        <div className="flex-shrink-0">
                          <Image
                            className="h-8 w-8 rounded-full"
                            src={`https://ui-avatars.com/api/?name=Sarah+Johnsor&background=random`.trim()}
                            alt={currentUser.name}
                            width={40}
                            height={40}
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            Sarah Johnson
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Product Manager, TechCorp
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                      <p className="text-gray-500 dark:text-gray-400">
                        As a freelancer, I use GoalTracker to manage my personal
                        goals and client projects. The milestone feature helps
                        me break down complex tasks into manageable steps.
                      </p>
                      <div className="mt-6 flex items-center">
                        <div className="flex-shrink-0">
                          <Image
                            className="h-8 w-8 rounded-full"
                            src={`https://ui-avatars.com/api/?name=Michael+Chen&background=random`.trim()}
                            alt={currentUser.name}
                            width={40}
                            height={40}
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            Michael Chen
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Independent Designer
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                      <p className="text-gray-500 dark:text-gray-400">
                        The comment system has improved our team communication
                        significantly. We can provide feedback and updates
                        without scheduling additional meetings.
                      </p>
                      <div className="mt-6 flex items-center">
                        <div className="flex-shrink-0">
                          <Image
                            className="h-8 w-8 rounded-full"
                            src={`https://ui-avatars.com/api/?name=A+B&background=random`.trim()}
                            alt={currentUser.name}
                            width={40}
                            height={40}
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            Emily Rodriguez
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Team Lead, InnovateCo
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Call to Action Section */}
            <section className="bg-blue-600 dark:bg-blue-800">
              <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
                <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  <span className="block">Ready to get started?</span>
                  <span className="block text-blue-200">
                    Start tracking your goals today.
                  </span>
                </h2>
                <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                  <div className="inline-flex rounded-md shadow">
                    <button
                      onClick={() => setActiveView("dashboard")}
                      className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
                    >
                      Get started
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeView === "dashboard" && (
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {/* Dashboard Header */}
            <div className="px-4 py-5 sm:px-6 flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Goal Dashboard
                </h1>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Track and manage your personal and team goals
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                <div className="relative">
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value as never)}
                    className="block w-full px-6 py-3 text-base border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="all">All Goals</option>
                    <option value="personal">Personal</option>
                    <option value="team">Team</option>
                    <option value="project">Project</option>
                  </select>
                </div>
                <button
                  onClick={() => setNewGoalModal(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  New Goal
                </button>
              </div>
            </div>

            {/* stats */}
            <div className="mt-6 px-4 sm:px-6">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                        <Target className="h-6 w-6 text-white" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                            Total Goals
                          </dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900 dark:text-white">
                              {totalGoals}
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                        <CheckCircle2 className="h-6 w-6 text-white" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                            Completed Goals
                          </dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900 dark:text-white">
                              {completedGoals}
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                        <Trophy className="h-6 w-6 text-white" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                            Completion Rate
                          </dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900 dark:text-white">
                              {completionRate}%
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div className="mt-6 px-4 sm:px-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                Upcoming Deadlines
              </h2>
              <div className="mt-2 bg-white dark:bg-gray-800 shadow overflow-hidden rounded-md">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {upcomingDeadlines.length > 0 ? (
                    upcomingDeadlines.map((goal) => (
                      <li key={goal.id} className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                              {goal.title}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Due: {new Date(goal.dueDate).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            <div className="flex items-center">
                              <Clock className="mr-1 h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {Math.ceil(
                                  (new Date(goal.dueDate).getTime() -
                                    new Date().getTime()) /
                                    (1000 * 60 * 60 * 24)
                                )}{" "}
                                days left
                              </span>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      No upcoming deadlines
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {/* Goals List */}
            <div className="mt-6 px-4 sm:px-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                {filterCategory === "all"
                  ? "All Goals"
                  : `${
                      filterCategory.charAt(0).toUpperCase() +
                      filterCategory.slice(1)
                    } Goals`}
              </h2>
              <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filteredGaols.length > 0 ? (
                  filteredGaols.map((goal) => (
                    <div
                      key={goal.id}
                      className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg cursor-pointer"
                      onClick={() => handleGoalClick(goal)}
                    >
                      <div className={`h-2 ${goal.color}`}></div>
                      <div className="px-4 py-5 sm:p-6">
                        <div className="flex justify-center gap-8">
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                            {goal.title}
                          </h3>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              goal.category === "personal"
                                ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                                : goal.category === "team"
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100"
                                : "bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100"
                            }`}
                          >
                            {goal.category.charAt(0).toUpperCase() +
                              goal.category.slice(1)}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                          {goal.description}
                        </p>
                        <div className="mt-4">
                          <div className="flex justify-center text-gray-500 dark:text-gray-400 gap-2">
                            <span>Progess</span>
                            <span>{goal.progress}%</span>
                          </div>
                          <div className="mt-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                            <div
                              style={{
                                width: `${goal.progress}%`,
                                transition: "width 0.5s ease-in-out",
                              }}
                              className={`h-2.5 rounded-full ${goal.color}`}
                            ></div>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                          <div className="flex -space-x-2">
                            {goal.teamMembers.slice(0, 3).map((memberId) => {
                              const user = getUserById(memberId);
                              return (
                                <Image
                                  key={user.id}
                                  className="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-gray-800"
                                  src={
                                    `https://ui-avatars.com/api/?name=${user.name}&background=random`.trim() ||
                                    "https://ui-avatars.com/api/?name=Null+Null&background=random`.trim()"
                                  }
                                  alt={user.name}
                                  width={24}
                                  height={24}
                                />
                              );
                            })}
                            {goal.teamMembers.length > 3 && (
                              <span className="flex items-center justify-center h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700 text-xs font-medium text-gray-500 dark:text-gray-400 ring-2 ring-white dark:ring-gray-800">
                                +{goal.teamMembers.length - 3}
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            <Calendar className="inline-block mr-1 h-4 w-4" />
                            {new Date(goal.dueDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-10">
                    <p className="text-gray-500 dark:text-gray-400">
                      No goals found. Create a new goal to get started!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeView === "goal" && selectedGoal && (
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 sm:px-0">
              <button
                onClick={() => setActiveView("dashboard")}
                className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-700 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700  focus:ring-2  focus:ring-blue-500"
              >
                <ChevronUp className="mr-2 h-4 w-4" />
                Back to Dashboard
              </button>
            </div>
            <div className="mt-4 px-4 sm:px-0">
              <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
                <div className={`h-2 ${selectedGoal.color}`}></div>
                <div className="px-4 py-5 sm:px-6 flex justify-between items-start">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                      {selectedGoal.title}
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                      Created on{" "}
                      {new Date(selectedGoal.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-700 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteGoal(selectedGoal.id)}
                      className="inline-flex items-center px-3 py-2 border border-red-300 dark:border-red-700 shadow-sm text-sm leading-4 font-medium rounded-md text-red-700 dark:text-red-300 bg-white dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </button>
                  </div>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Description
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                        {selectedGoal.description}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Category
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            selectedGoal.category === "personal"
                              ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                              : selectedGoal.category === "team"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100"
                              : "bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100"
                          }`}
                        >
                          {selectedGoal.category.charAt(0).toUpperCase() +
                            selectedGoal.category.slice(1)}
                        </span>
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Due Date
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                        {new Date(selectedGoal.dueDate).toLocaleDateString()}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Owner
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                        <div className="flex items-center">
                          <Image
                            className="h-8 w-8 rounded-full mr-2"
                            src={
                              `https://ui-avatars.com/api/?name=Alex+John&background=random`.trim() ||
                              ""
                            }
                            alt={getUserById(selectedGoal.ownerId).name}
                            width={32}
                            height={32}
                          />
                          {getUserById(selectedGoal.ownerId).name}
                        </div>
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Team Members
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                        <div className="flex flex-wrap gap-2">
                          {selectedGoal.teamMembers.map((memberId) => {
                            const user = getUserById(memberId);
                            return (
                              <div key={memberId} className="flex items-center">
                                <Image
                                  className="h-6 w-6 rounded-full mr-2"
                                  src={`https://ui-avatars.com/api/?name=${user.name}&background=random`.trim()}
                                  alt={user.name}
                                  width={24}
                                  height={24}
                                />
                                <span>{user.name}</span>
                              </div>
                            );
                          })}
                        </div>
                      </dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Progress
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                          <span>Overall Completion</span>
                          <span>{selectedGoal.progress}%</span>
                        </div>
                        <div className="mt-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                          <div
                            style={{
                              width: `${selectedGoal.progress}%`,
                              transition: "width 0.5s ease-in-out",
                            }}
                            className={`h-2.5 rounded-full ${selectedGoal.color}`}
                          ></div>
                        </div>
                      </dd>
                    </div>
                  </dl>
                </div>

                {/* Milestones */}
                <div className="border-t border-gray-200 dark:border-gray-700">
                  <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                      Milestones
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                      Track progress through key achievements
                    </p>
                  </div>
                  <div className="px-4 sm:px-6 pb-5">
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                      {selectedGoal.milestones.map((milestone) => (
                        <li
                          key={milestone.id}
                          className="py-4 flex items-center justify-between"
                        >
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={milestone.isCompleted}
                              onChange={() =>
                                handleToggleMilestone(milestone.id)
                              }
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-700 rounded"
                            />
                            <label
                              className={`ml-3 block text-sm font-medium ${
                                milestone.isCompleted
                                  ? "text-gray-400 dark:text-gray-500 line-through"
                                  : "text-gray-700 dark:text-gray-300"
                              }`}
                            >
                              {milestone.title}
                            </label>
                          </div>
                          {milestone.isCompleted && milestone.completedAt && (
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              Completed on{" "}
                              {new Date(
                                milestone.completedAt
                              ).toLocaleDateString()}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                    {selectedGoal.milestones.length === 0 && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 py-4">
                        No milestones defined for this goal.
                      </p>
                    )}
                  </div>
                </div>

                {/* Comments */}
                <div className="border-t border-gray-200 dark:border-gray-700">
                  <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                      Comments
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                      Collaborate and provide feedback
                    </p>
                  </div>
                  <div className="px-4 sm:px-6 pb-5">
                    <div className="space-y-4">
                      {selectedGoal.comments.map((comment) => {
                        const user = getUserById(comment.userId);
                        return (
                          <div
                            key={comment.id}
                            className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4"
                          >
                            <div className="flex">
                              <div className="flex-shrink-0 mr-3">
                                <Image
                                  className="h-10 w-10 rounded-full"
                                  src={`https://ui-avatars.com/api/?name=${user.name}+j&background=random`.trim()}
                                  alt={user.name}
                                  width={40}
                                  height={40}
                                />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                                    {user.name}
                                  </h4>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {new Date(
                                      comment.createdAt
                                    ).toLocaleString()}
                                  </p>
                                </div>
                                <div className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                                  <p>{comment.text}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}

                      {selectedGoal.comments.length === 0 && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 py-4">
                          No comments yet. Be the first to comment!
                        </p>
                      )}

                      {/* Add comment form */}
                      <div className="mt-4">
                        <div className="flex">
                          <div className="flex-shrink-0 mr-3">
                            <Image
                              className="h-10 w-10 rounded-full"
                              src={`https://ui-avatars.com/api/?name=${currentUser.name}+j&background=random`.trim()}
                              alt={currentUser.name}
                              width={40}
                              height={40}
                            />
                          </div>
                          <div className="flex-1">
                            <div className="border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
                              <textarea
                                rows={3}
                                name="comment"
                                id="comment"
                                className="block w-full py-3 px-4 border-0 resize-none focus:ring-0 text-gray-900 dark:text-white bg-white dark:bg-gray-800 sm:text-sm"
                                placeholder="Add a comment..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                              ></textarea>
                              <div className="py-2 px-4 bg-gray-50 dark:bg-gray-900 flex justify-end">
                                <button
                                  type="submit"
                                  onClick={handleAddComment}
                                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700  focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                  disabled={!newComment.trim()}
                                >
                                  Comment
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* New Goal Modal */}
        {newGoalModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto ">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0 ">
              <div
                className="fixed inset-0 transition-opacity "
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
              </div>
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6 ">
                <div>
                  <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                      Create New Goal
                    </h3>
                    <div className="mt-6 space-y-4">
                      {/*Title*/}
                      <div>
                        <label
                          htmlFor="title"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Title
                        </label>
                        <input
                          type="text"
                          name="title"
                          id="title"
                          value={newGoalData.title}
                          onChange={(e) =>
                            setNewGoalData({
                              ...newGoalData,
                              title: e.target.value,
                            })
                          }
                          className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          placeholder="Goal title"
                        />
                      </div>

                      {/*Description*/}
                      <div>
                        <label
                          htmlFor="description"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Description
                        </label>
                        <textarea
                          id="description"
                          name="description"
                          rows={3}
                          value={newGoalData.description}
                          onChange={(e) =>
                            setNewGoalData({
                              ...newGoalData,
                              description: e.target.value,
                            })
                          }
                          className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          placeholder="Describe your goal"
                        ></textarea>
                      </div>

                      {/*Milestones*/}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Milestones
                        </label>

                        {newGoalData.Milestones.map((milestone, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2 mt-2"
                          >
                            <input
                              type="text"
                              value={milestone.title}
                              onChange={(e) =>
                                handleMilestoneTitleChange(
                                  index,
                                  e.target.value
                                )
                              }
                              placeholder={`Milestone ${index + 1}`}
                              className="flex-1 border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveMilestone(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              ✕
                            </button>
                          </div>
                        ))}

                        <button
                          type="button"
                          onClick={handleAddMilestone}
                          className="mt-2 text-blue-600 hover:underline text-sm"
                        >
                          + Add Milestone
                        </button>
                      </div>

                      {/*Category*/}
                      <div>
                        <label
                          htmlFor="category"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Category
                        </label>
                        <select
                          id="category"
                          name="category"
                          value={newGoalData.category}
                          onChange={(e) =>
                            setNewGoalData({
                              ...newGoalData,
                              category: e.target.value,
                            })
                          }
                          className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        >
                          <option value="personal">Personal</option>
                          <option value="team">Team</option>
                          <option value="project">Project</option>
                        </select>
                      </div>

                      {/*Due Date*/}
                      <div>
                        <label
                          htmlFor="dueDate"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Due Date
                        </label>
                        <input
                          type="date"
                          name="dueDate"
                          id="dueDate"
                          value={newGoalData.dueDate}
                          onChange={(e) =>
                            setNewGoalData({
                              ...newGoalData,
                              dueDate: e.target.value,
                            })
                          }
                          className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        />
                      </div>

                      {/*Color*/}
                      <div>
                        <label
                          htmlFor="color"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Choose Color
                        </label>
                        <select
                          id="color"
                          name="color"
                          value={newGoalData.color}
                          onChange={(e) =>
                            setNewGoalData({
                              ...newGoalData,
                              color: e.target.value,
                            })
                          }
                          className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white "
                        >
                          <option value="bg-green-500">Green</option>
                          <option value="bg-blue-500">Blue</option>
                          <option value="bg-pink-500">Pink</option>
                          <option value=" bg-purple-500">Purple</option>
                          <option value="bg-red-500">Red</option>
                          <option value="bg-orange-500">Orange</option>
                        </select>
                      </div>

                      {/*Team Members*/}
                      <div>
                        <label
                          htmlFor="teamMembers"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Team Members
                        </label>
                        <div className="mt-1 space-y-2">
                          {mockUsers
                            .filter((user) => user.id !== currentUser.id)
                            .map((user) => (
                              <div key={user.id} className="flex items-center">
                                <input
                                  id={`user-${user.id}`}
                                  name={`user-${user.id}`}
                                  type="checkbox"
                                  checked={newGoalData.teamMembers.includes(
                                    user.id
                                  )}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setNewGoalData({
                                        ...newGoalData,
                                        teamMembers: [
                                          ...newGoalData.teamMembers,
                                          user.id,
                                        ],
                                      });
                                    } else {
                                      setNewGoalData({
                                        ...newGoalData,
                                        teamMembers:
                                          newGoalData.teamMembers.filter(
                                            (id) => id !== user.id
                                          ),
                                      });
                                    }
                                  }}
                                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-700 rounded"
                                />
                                <label
                                  htmlFor={`user-${user.id}`}
                                  className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                  <div className="flex items-center">
                                    <Image
                                      className="h-8 w-8 rounded-full mr-2"
                                      src={`https://ui-avatars.com/api/?name=${user.name}+j&background=random`.trim()}
                                      alt={user.name}
                                      width={32}
                                      height={32}
                                    />
                                    <span className="text-gray-900 dark:text-white truncate" />
                                    {user.name}
                                  </div>
                                </label>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <button
                    type="button"
                    onClick={handleNewGoalSubmit}
                    disabled={!newGoalData.title || !newGoalData.dueDate}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Create
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewGoalModal(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-700 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Goal Modal */}
      </main>

      {/* Footer can be added here */}
      <footer className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6  md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Twitter</span>
              <Twitter />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">GitHub</span>
              <Github />
            </a>
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-base text-gray-400">
              &copy; 2024 GoalTracker, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default GaolTracker;
