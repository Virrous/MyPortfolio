# Ashes Portfolio Website

A modern, responsive portfolio website built with Next.js, React, and Tailwind CSS featuring a professional purple theme and smooth animations.

## Features

- 🎨 Modern purple-themed design with clean white background
- 📱 Fully responsive across all devices
- ✨ Smooth animations and transitions
- 🚀 Built with Next.js 14 and React 19
- 💜 Professional color scheme with excellent contrast
- 📧 Contact form with email integration
- 🔗 Social media links (LinkedIn, GitHub)
- 📞 WhatsApp integration for contact

## Getting Started

### Prerequisites

Make sure you have Node.js installed on your machine:
- Node.js 18.17 or later
- npm or yarn package manager

### Installation

1. **Clone or download the project**
   \`\`\`bash
   # If using git
   git clone <your-repo-url>
   cd ashes-portfolio
   
   # Or extract the downloaded ZIP file
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see your portfolio.

### Customization

#### Replace Your Photo
Replace the placeholder image at `public/professional-developer-portrait.png` with your actual professional photo.

#### Update Contact Information
Edit the contact details in `components/contact-section.tsx`:
- Email: Change `unseenshadow@gmail.com` to your email
- Phone numbers: Update the WhatsApp and contact numbers
- Social links: Update LinkedIn and GitHub URLs

#### Add Your Projects
Update the projects array in `components/projects-section.tsx` with your actual projects:
- Replace project images in the `public/` folder
- Update project titles, descriptions, and links
- Add your GitHub repository and live demo URLs

#### Customize Content
- Update the about section description in `components/hero-section.tsx`
- Modify the services in `components/about-section.tsx`
- Adjust colors in `app/globals.css` if needed

## Project Structure

\`\`\`
├── app/
│   ├── globals.css          # Global styles and color tokens
│   ├── layout.tsx           # Root layout with fonts
│   └── page.tsx             # Main page component
├── components/
│   ├── ui/                  # Reusable UI components
│   ├── hero-section.tsx     # Landing section with intro
│   ├── about-section.tsx    # Services/what you do section
│   ├── projects-section.tsx # Projects showcase
│   ├── contact-section.tsx  # Contact form and info
│   └── navigation.tsx       # Navigation bar
├── public/                  # Static assets (images, etc.)
└── README.md               # This file
\`\`\`

## Technologies Used

- **Next.js 14** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling and responsive design
- **Radix UI** - Accessible UI components
- **Lucide React** - Beautiful icons
- **React Hook Form** - Form handling
- **Zod** - Form validation

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

This portfolio is ready to deploy on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with one click

## Contact Form Setup

To make the contact form functional, you'll need to:

1. Set up an email service (like EmailJS, Resend, or Nodemailer)
2. Add the email handling logic to a Next.js API route
3. Update the form submission in `components/contact-section.tsx`

## License

This project is open source and available under the MIT License.
