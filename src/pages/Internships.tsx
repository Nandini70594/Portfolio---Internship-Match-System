import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Search, MapPin, Calendar, Building } from "lucide-react";

interface Internship {
  id: number;
  name: string;
  company: string;
  duration: string;
  location: string;
  skills: string[];
  description: string;
}

const mockInternships: Internship[] = [
  {
    id: 1,
    name: "Frontend Developer Intern",
    company: "TechCorp",
    duration: "3 months",
    location: "Remote",
    skills: ["React", "JavaScript", "CSS"],
    description: "Join our team to build modern web applications using React and TypeScript."
  },
  {
    id: 2,
    name: "Data Science Intern",
    company: "DataViz Inc",
    duration: "6 months",
    location: "Mumbai",
    skills: ["Python", "Machine Learning", "SQL"],
    description: "Work on real-world data analysis projects and machine learning models."
  },
  {
    id: 3,
    name: "UX Design Intern",
    company: "DesignHub",
    duration: "4 months",
    location: "Pune",
    skills: ["Figma", "UI/UX", "Design Thinking"],
    description: "Create beautiful user experiences for our mobile and web applications."
  },
  {
    id: 4,
    name: "Backend Developer Intern",
    company: "CloudSystems",
    duration: "3 months",
    location: "Remote",
    skills: ["Node.js", "Python", "AWS"],
    description: "Build scalable backend systems and APIs for cloud-based applications."
  },
  {
    id: 5,
    name: "Marketing Intern",
    company: "GrowthLab",
    duration: "3 months",
    location: "Nashik",
    skills: ["Digital Marketing", "Content Creation", "Analytics"],
    description: "Help develop and execute marketing campaigns for our SaaS products."
  },
  {
    id: 6,
    name: "Mobile App Developer Intern",
    company: "AppFactory",
    duration: "4 months",
    location: "Bangalore",
    skills: ["React Native", "iOS", "Android"],
    description: "Develop cross-platform mobile applications for our growing user base."
  }
];

const Internships = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);
  const [applications, setApplications] = useState(
    JSON.parse(localStorage.getItem("applications") || "[]")
  );

  const filteredInternships = mockInternships.filter(
    (internship) =>
      internship.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleApply = (internship: Internship) => {
    const alreadyApplied = applications.some((app: any) => app.internshipId === internship.id);
    
    if (alreadyApplied) {
      toast({
        title: "Already Applied",
        description: "You have already applied to this internship",
        variant: "destructive"
      });
      return;
    }

    const newApplication = {
      internshipId: internship.id,
      internshipName: internship.name,
      company: internship.company,
      status: "Pending",
      appliedDate: new Date().toISOString()
    };

    const updatedApplications = [...applications, newApplication];
    localStorage.setItem("applications", JSON.stringify(updatedApplications));
    setApplications(updatedApplications);
    setSelectedInternship(null);

    toast({
      title: "Success!",
      description: `Your application to ${internship.name} has been submitted`
    });
  };

  const isApplied = (internshipId: number) => {
    return applications.some((app: any) => app.internshipId === internshipId);
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Browse Internships</h1>
          <p className="text-muted-foreground text-lg">Find opportunities that match your skills</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by name, company, location, or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Internships Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInternships.map((internship) => (
            <Card key={internship.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-start justify-between">
                  <span className="text-lg">{internship.name}</span>
                  {isApplied(internship.id) && (
                    <Badge variant="secondary">Applied</Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Building className="h-4 w-4" />
                    {internship.company}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {internship.duration}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {internship.location}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {internship.skills.map((skill, index) => (
                    <Badge key={index} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <Button
                  className="w-full"
                  onClick={() => setSelectedInternship(internship)}
                  disabled={isApplied(internship.id)}
                >
                  {isApplied(internship.id) ? "Applied" : "View Details"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredInternships.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <p className="text-muted-foreground">
                No internships found matching your search
              </p>
            </CardContent>
          </Card>
        )}

        {/* Application Dialog */}
        <Dialog open={!!selectedInternship} onOpenChange={() => setSelectedInternship(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">{selectedInternship?.name}</DialogTitle>
            </DialogHeader>
            {selectedInternship && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">{selectedInternship.company}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <span>{selectedInternship.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <span>{selectedInternship.location}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Required Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedInternship.skills.map((skill, index) => (
                      <Badge key={index}>{skill}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Description</h4>
                  <p className="text-muted-foreground">{selectedInternship.description}</p>
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => handleApply(selectedInternship)}
                >
                  Apply Now
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default Internships;
