import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarSeparator,
    SidebarInset,
} from "@/components/ui/sidebar";
import {
    FileText,
    Home,
    Briefcase,
    BarChart3,
    Cog,
    User,
    BookOpen,
    Layers,
    LogOut,
    Bell,
    Shield,
    Palette,
    Download
} from 'lucide-react';

const Settings = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [pushNotifications, setPushNotifications] = useState(false);
    const [autoSave, setAutoSave] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const { toast } = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                navigate('/sign-in');
            }
        };

        checkAuth();
        setIsLoaded(true);

        // Welcome toast
        const timer = setTimeout(() => {
            toast({
                title: "Settings",
                description: "Customize your experience"
            });
        }, 500);

        return () => clearTimeout(timer);
    }, [navigate, toast]);

    const handleLogout = async () => {
        try {
            await supabase.auth.signOut();
            navigate('/');
        } catch (error) {
            console.error('Error signing out:', error);
            toast({
                title: "Error",
                description: "Failed to sign out. Please try again.",
                variant: "destructive"
            });
        }
    };

    const handleSaveSettings = () => {
        toast({
            title: "Settings Saved",
            description: "Your preferences have been updated successfully."
        });
    };

    return (
        <SidebarProvider defaultOpen={true}>
            <div className="min-h-screen flex w-full bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-950 dark:to-purple-950">
                <Sidebar className="bg-white/50 backdrop-blur-xl border-r border-primary/10">
                    <SidebarHeader>
                        <div className="flex items-center gap-3 px-4 py-3">
                            <div className="rounded-xl p-2 bg-gradient-to-br from-primary to-primary/80 shadow-lg">
                                <FileText className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <span className="font-bold text-xl bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">Vireia AI</span>
                                <p className="text-xs text-muted-foreground">Your career companion</p>
                            </div>
                        </div>
                    </SidebarHeader>

                    <SidebarContent className="px-3">
                        <SidebarGroup>
                            <SidebarGroupLabel className="text-primary/70 font-semibold">Dashboard</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton tooltip="Home" className="hover:bg-primary/5 " onClick={() => navigate('/dashboard')}>
                                            <Home className="h-5 w-5" />
                                            <span>Home</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton tooltip="My Resumes" asChild className="hover:bg-primary/5">
                                            <Link to="/resume">
                                                <FileText className="h-5 w-5" />
                                                <span>My Resumes</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton tooltip="Applications" asChild className="hover:bg-primary/5">
                                            <Link to="/applications">
                                                <Briefcase className="h-5 w-5" />
                                                <span>Applications</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton tooltip="Analytics" asChild className="hover:bg-primary/5">
                                            <Link to="/analytics">
                                                <BarChart3 className="h-5 w-5" />
                                                <span>Analytics</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>

                        <SidebarSeparator className="bg-primary/20" />

                        <SidebarGroup>
                            <SidebarGroupLabel className="text-primary/70 font-semibold">Resources</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton tooltip="Learn" className="hover:bg-primary/5">
                                            <BookOpen className="h-5 w-5" />
                                            <span>Learning Center</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton tooltip="Templates" asChild className="hover:bg-primary/5">
                                            <Link to="/templates">
                                                <Layers className="h-5 w-5" />
                                                <span>Templates</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>

                    <SidebarFooter>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton tooltip="Settings" isActive={true} className="bg-primary/10 text-primary border border-primary/20">
                                    <Cog className="h-5 w-5" />
                                    <span>Settings</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton tooltip="Account" asChild className="hover:bg-primary/5">
                                    <Link to="/account">
                                        <User className="h-5 w-5" />
                                        <span>Account</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton tooltip="Log Out" onClick={handleLogout} className="hover:bg-destructive/10 hover:text-destructive">
                                    <LogOut className="h-5 w-5" />
                                    <span>Log Out</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarFooter>
                </Sidebar>

                <SidebarInset>
                    <div className="container max-w-4xl mx-auto px-4 py-8">
                        {/* Page Header */}
                        <div className={`mb-8 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-resume-purple to-resume-violet bg-clip-text text-transparent">
                                Settings
                            </h1>
                            <p className="text-resume-gray mt-1">Customize your preferences and privacy settings</p>
                        </div>

                        <div className="space-y-6">
                            {/* Notifications Settings */}
                            <Card className={`${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
                                <CardHeader>
                                    <div className="flex items-center gap-2">
                                        <Bell className="h-5 w-5 text-resume-purple" />
                                        <CardTitle>Notifications</CardTitle>
                                    </div>
                                    <CardDescription>
                                        Configure how you receive notifications and updates
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="email-notifications" className="text-base">
                                                Email Notifications
                                            </Label>
                                            <p className="text-sm text-muted-foreground">
                                                Receive updates about your resumes and applications via email
                                            </p>
                                        </div>
                                        <Switch
                                            id="email-notifications"
                                            checked={emailNotifications}
                                            onCheckedChange={setEmailNotifications}
                                        />
                                    </div>

                                    <Separator />

                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="push-notifications" className="text-base">
                                                Push Notifications
                                            </Label>
                                            <p className="text-sm text-muted-foreground">
                                                Get instant notifications in your browser
                                            </p>
                                        </div>
                                        <Switch
                                            id="push-notifications"
                                            checked={pushNotifications}
                                            onCheckedChange={setPushNotifications}
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Privacy & Security */}
                            <Card className={`${isLoaded ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '100ms' }}>
                                <CardHeader>
                                    <div className="flex items-center gap-2">
                                        <Shield className="h-5 w-5 text-resume-purple" />
                                        <CardTitle>Privacy & Security</CardTitle>
                                    </div>
                                    <CardDescription>
                                        Manage your data and security preferences
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="auto-save" className="text-base">
                                                Auto-save Changes
                                            </Label>
                                            <p className="text-sm text-muted-foreground">
                                                Automatically save your resume changes as you type
                                            </p>
                                        </div>
                                        <Switch
                                            id="auto-save"
                                            checked={autoSave}
                                            onCheckedChange={setAutoSave}
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Appearance Settings */}
                            <Card className={`${isLoaded ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '200ms' }}>
                                <CardHeader>
                                    <div className="flex items-center gap-2">
                                        <Palette className="h-5 w-5 text-resume-purple" />
                                        <CardTitle>Appearance</CardTitle>
                                    </div>
                                    <CardDescription>
                                        Customize the look and feel of your workspace
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="dark-mode" className="text-base">
                                                Dark Mode
                                            </Label>
                                            <p className="text-sm text-muted-foreground">
                                                Use dark theme for reduced eye strain
                                            </p>
                                        </div>
                                        <Switch
                                            id="dark-mode"
                                            checked={darkMode}
                                            onCheckedChange={setDarkMode}
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Data Management */}
                            <Card className={`${isLoaded ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '300ms' }}>
                                <CardHeader>
                                    <div className="flex items-center gap-2">
                                        <Download className="h-5 w-5 text-resume-purple" />
                                        <CardTitle>Data Management</CardTitle>
                                    </div>
                                    <CardDescription>
                                        Export your data or manage your account
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label className="text-base">
                                                Export Data
                                            </Label>
                                            <p className="text-sm text-muted-foreground">
                                                Download all your resumes and data
                                            </p>
                                        </div>
                                        <Button variant="outline" size="sm">
                                            Export
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Save Button */}
                            <div className={`flex justify-end ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '400ms' }}>
                                <Button
                                    className="bg-resume-purple hover:bg-resume-purple-dark"
                                    onClick={handleSaveSettings}
                                >
                                    Save Settings
                                </Button>
                            </div>
                        </div>
                    </div>
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
};

export default Settings;