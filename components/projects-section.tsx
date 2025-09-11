import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";

export function ProjectsSection() {
  const projects = [
    {
      title: "BullSaga -An AI powered Nepse Stock Prediction System",
      description:
        "A comprehensive stock prediction and analysis platform built for the NEPSE market, offering real-time updates and interactive dashboards for a seamless user experience. It utilizes LSTM-based machine learning models to forecast next-day stock prices with higher accuracy, enabling investors to make data-driven decisions. The system also integrates historical and live financial data, providing reliable insights for traders and analysts. With a strong backend and modern UI, it bridges technology and investment, making stock analysis both accessible and intelligent.",
      image: "/bullsagaDash.png",
      tags: ["Python", "Node Js", "Mongo DB", "LSTM"],
      liveUrl: "#",
      githubUrl: "https://github.com/its-manzil/bullsaga",
    },
    {
      title: "MyProperty -A Blockchain Based Land Registry and Transfer System",
      description:
        "A blockchain-powered land and property management system designed to provide secure ownership records, seamless registration, and transparent land transfers. The platform integrates Solidity smart contracts on Ethereum for decentralization and Node.js for backend processing. It ensures tamper-proof record keeping, user authentication, and efficient interaction between landowners and government offices, making property management more trustworthy and accessible.",
      image: "/ai-content-generator-interface.png",
      tags: ["Ethereum", "Node Js", "Solidity", "Ethers"],
      liveUrl: "#",
      githubUrl:
        "https://github.com/Virrous/myproperty-BlockchainBasedLandManagementSystem",
    },
    {
      title: "ColorMe -A Color Visualization System",
      description:
        "ColorMe is an interactive house painting and visualization platform that allows users to upload house images and experiment with different wall colors in real time. The system uses image processing and Fabric.js for wall segmentation, Tailwind CSS and Canvas API for smooth UI rendering, and Django as the backend for managing user data and design storage. By blending 2D visualization with intuitive painting tools, ColorMe provides homeowners and designers with an easy and accurate way to preview color schemes before real-world application.",
      image: "/colormeDash.png",
      tags: ["Django", "U-Net", "Fabric Js", "Canvas API"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "SajiloAuto -An Auto Booking System",
      description:
        "A smart auto-booking platform that connects passengers with nearby drivers in real-time. It includes features such as OTP-based ride verification, live location and destination tracking, and a driver-customer dashboard for secure and seamless ride management. Built with Django and SQLite for backend, Google Maps API for geolocation services, and WebSockets for real-time communication, the system ensures safety, transparency, and reliability in daily accomodation.",
      image: "/sajiloAuto.jpeg",
      tags: ["Django", "OSM", "WebSockets", "OTP"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "SajiloLibrary -A Library Management System",
      description:
        "a digital library management system designed to simplify book borrowing, and user management for academic institutions. It provides an interactive dashboard for librarians, ensuring quick access to resources with real-time availability updates. The system supports automated record-keeping and search reducing manual effort and improving efficiency. Built with a reliable backend and modern UI, SajiloLibrary makes library operations more organized, accessible, and user-friendly.",
      image: "/sajiloLibrary.jpg",
      tags: ["Django", "SQLite", "College Project"],
      liveUrl: "#",
      githubUrl: "#",
    },
    // {
    //   title: "Predictive Analytics API",
    //   description:
    //     "RESTful API service providing machine learning predictions for business intelligence. Features model versioning, A/B testing, and real-time inference.",
    //   image: "/api-analytics-interface.jpg",
    //   tags: ["Python", "FastAPI", "ML", "Docker"],
    //   liveUrl: "#",
    //   githubUrl: "#",
    // },
  ];

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-balance">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            A showcase of my recent work spanning web development, blockchain
            applications, and AI-powered solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                    <Github className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-xl text-balance">
                  {project.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm leading-relaxed text-pretty">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-primary/10 text-foreground text-xs rounded-md font-medium border border-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="flex-1">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Live Demo
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 bg-transparent"
                  >
                    <Github className="h-4 w-4 mr-2" />
                    Code
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
