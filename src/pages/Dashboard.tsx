import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, Briefcase, CheckCircle, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const skills = JSON.parse(localStorage.getItem("skills") || "[]");
  const applications = JSON.parse(localStorage.getItem("applications") || "[]");

  const stats = [
    { label: "Skills Added", value: skills.length, icon: Award, color: "text-primary" },
    { label: "Applications", value: applications.length, icon: Briefcase, color: "text-accent" },
    { label: "Accepted", value: applications.filter((a: any) => a.status === "Accepted").length, icon: CheckCircle, color: "text-accent" },
    { label: "Pending", value: applications.filter((a: any) => a.status === "Pending").length, icon: Clock, color: "text-yellow-500" }
  ];

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Welcome back, {user.fullName}! 👋</h1>
          <p className="text-muted-foreground text-lg">Here's an overview of your profile and applications</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-3xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-10 w-10 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Profile Info */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Profile Information</CardTitle>
              <Button variant="outline" size="sm">Edit</Button>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{user.fullName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Profile Status</p>
                <Badge variant="secondary">Active</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Recent Skills */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Your Skills</CardTitle>
              <Link to="/skills">
                <Button variant="outline" size="sm">Manage Skills</Button>
              </Link>
            </CardHeader>
            <CardContent>
              {skills.length === 0 ? (
                <div className="text-center py-8">
                  <Award className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground mb-4">No skills added yet</p>
                  <Link to="/skills">
                    <Button>Add Your First Skill</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {skills.slice(0, 3).map((skill: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium">{skill.name}</p>
                        <p className="text-sm text-muted-foreground">{skill.level}</p>
                      </div>
                    </div>
                  ))}
                  {skills.length > 3 && (
                    <p className="text-sm text-center text-muted-foreground">
                      +{skills.length - 3} more skills
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Applied Internships */}
        <Card className="mt-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Applied Internships</CardTitle>
            <Link to="/internships">
              <Button variant="outline" size="sm">View All</Button>
            </Link>
          </CardHeader>
          <CardContent>
            {applications.length === 0 ? (
              <div className="text-center py-8">
                <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground mb-4">You haven't applied to any internships yet</p>
                <Link to="/internships">
                  <Button>Browse Internships</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {applications.map((app: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{app.internshipName}</p>
                      <p className="text-sm text-muted-foreground">{app.company}</p>
                    </div>
                    <Badge variant={app.status === "Accepted" ? "default" : "secondary"}>
                      {app.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
