import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    quote:
      "DevLink has completely transformed how I organize my projects. Everything is easily accessible and the interface is intuitive.",
    name: "Alex Chen",
    role: "Frontend Developer",
    initials: "AC",
  },
  {
    quote:
      "The code integration is seamless. I can switch between projects without losing context, which has increased my productivity.",
    name: "Sarah Johnson",
    role: "Full Stack Engineer",
    initials: "SJ",
  },
  {
    quote:
      "As a team lead, I appreciate the collaboration features. Assigning tasks and tracking progress has never been easier.",
    name: "Michael Park",
    role: "Engineering Manager",
    initials: "MP",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight">
            Loved by <span className="gradient-text">developers</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            See what others are saying about their experience with DevLink.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <CardHeader>
                <CardDescription className="text-lg italic text-gray-600">
                  {testimonial.quote}
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex items-center space-x-4">
                <Avatar>
                  <AvatarFallback className="bg-devlink-secondary text-white">
                    {testimonial.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-devlink-primary">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
