import { Card, CardContent } from "@/components/ui/card";
import { Smartphone, Brain, Blocks } from "lucide-react";

export function AboutSection() {
  const services = [
    {
      icon: <Smartphone className="h-8 w-8 text-primary" />,
      title: "Responsive Web Apps",
      description:
        "Building modern, scalable web applications using Python frameworks like Django and Flask, ensuring optimal performance across all devices.",
    },
    {
      icon: <Blocks className="h-8 w-8 text-primary" />,
      title: "Blockchain Smart Contracts",
      description:
        "Developing secure and efficient smart contracts for various blockchain platforms, specializing in DeFi and Web3 applications.",
    },
    {
      icon: <Brain className="h-8 w-8 text-primary" />,
      title: "AI & ML Solutions",
      description:
        "Creating intelligent systems using machine learning algorithms and AI technologies to solve complex business problems.",
    },
  ];

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-balance">What I Do</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            I specialize in delivering innovative solutions that seamlessly integrate traditional web development with advanced technologies such as blockchain and artificial intelligence to drive digital transformation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border-border/50"
            >
              <CardContent className="p-6">
                <div className="mb-4 group-hover:scale-110 transition-transform duration-300">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-balance">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-pretty">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
