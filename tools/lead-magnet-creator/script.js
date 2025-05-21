document.getElementById('lead-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const type = document.getElementById('lead-type').value;
  const topic = document.getElementById('lead-topic').value.trim();

  if (!type || !topic) return;

  // Generate content
  const titleTemplates = {
    eBook: [
      `The Ultimate Guide to ${topic}`,
      `${topic} Strategies for Success`,
      `Mastering ${topic}: A Comprehensive eBook`
    ],
    Checklist: [
      `${topic} Checklist: Step-by-Step to Success`,
      `Don't Miss a Step: ${topic} Checklist`,
      `Your Complete ${topic} To-Do List`
    ],
    Template: [
      `${topic} Template: Streamline Your Process`,
      `Ready-to-Use ${topic} Template`,
      `Customize Your ${topic} with This Template`
    ],
    Toolkit: [
      `Essential ${topic} Toolkit`,
      `All-in-One ${topic} Resources`,
      `Your ${topic} Toolbox for Success`
    ],
    Webinar: [
      `Live Webinar: Exploring ${topic}`,
      `Join Our ${topic} Webinar Session`,
      `Unlock Insights in Our ${topic} Webinar`
    ],
    Guide: [
      `The Definitive Guide to ${topic}`,
      `Navigating ${topic}: A Complete Guide`,
      `Your Go-To Guide for ${topic}`
    ],
    Course: [
      `Enroll in Our ${topic} Mini Course`,
      `Quick Course: Mastering ${topic}`,
      `Accelerate Your Skills with ${topic} Course`
    ],
    Quiz: [
      `Test Your Knowledge: ${topic} Quiz`,
      `How Much Do You Know About ${topic}?`,
      `Challenge Yourself with This ${topic} Quiz`
    ],
    Trial: [
      `Experience ${topic} with a Free Trial`,
      `Try Our ${topic} Solution for Free`,
      `Get Started with a ${topic} Trial`
    ],
    Infographic: [
      `${topic} Explained: Infographic`,
      `Visualizing ${topic}: An Infographic`,
      `Key Stats and Facts About ${topic}`
    ],
    Community: [
      `Join Our ${topic} Community`,
      `Exclusive Access to ${topic} Forum`,
      `Connect with ${topic} Enthusiasts`
    ],
    Challenge: [
      `Take the ${topic} Challenge`,
      `7-Day ${topic} Challenge`,
      `Boost Your Skills with the ${topic} Challenge`
    ],
    Library: [
      `${topic} Resource Library`,
      `Access Comprehensive ${topic} Materials`,
      `Curated ${topic} Resources at Your Fingertips`
    ],
    ProductPicker: [
      `Find the Right ${topic} Solution`,
      `${topic} Product Picker Tool`,
      `Customize Your ${topic} Experience`
    ]
  };

  const subTemplates = {
    eBook: `Dive deep into ${topic} with our comprehensive eBook.`,
    Checklist: `Ensure you cover all aspects of ${topic} with this checklist.`,
    Template: `Simplify your ${topic} tasks with this ready-to-use template.`,
    Toolkit: `Equip yourself with essential tools for ${topic}.`,
    Webinar: `Join our experts as they discuss key insights on ${topic}.`,
    Guide: `Navigate the complexities of ${topic} with this guide.`,
    Course: `Enhance your understanding of ${topic} through this mini course.`,
    Quiz: `Assess your knowledge on ${topic} with this interactive quiz.`,
    Trial: `Experience the benefits of ${topic} firsthand with a free trial.`,
    Infographic: `Visualize important data and trends in ${topic}.`,
    Community: `Engage with peers and experts in our ${topic} community.`,
    Challenge: `Push your limits and improve your ${topic} skills.`,
    Library: `Access a wealth of resources related to ${topic}.`,
    ProductPicker: `Discover the best ${topic} solutions tailored for you.`
  };

  const bullets = {
    eBook: [
      `In-depth analysis of ${topic} trends.`,
      `Expert insights and strategies.`,
      `Practical examples and case studies.`,
      `Comprehensive coverage of key concepts.`
    ],
    Checklist: [
      `Step-by-step tasks for ${topic}.`,
      `Ensure no critical steps are missed.`,
      `Easy to follow and implement.`,
      `Printable and shareable format.`
    ],
    Template: [
      `Customizable fields for your needs.`,
      `Professional design and layout.`,
      `Time-saving structure.`,
      `Compatible with various platforms.`
    ],
    Toolkit: [
      `Collection of essential ${topic} tools.`,
      `User-friendly resources.`,
      `Regularly updated content.`,
      `Expert-approved selections.`
    ],
    Webinar: [
      `Live Q&A sessions.`,
      `Access to recorded sessions.`,
      `Insights from industry leaders.`,
      `Interactive discussions.`
    ],
    Guide: [
      `Comprehensive coverage of ${topic}.`,
      `Tips and best practices.`,
      `Common pitfalls to avoid.`,
      `Actionable recommendations.`
    ],
    Course: [
      `Structured learning modules.`,
      `Quizzes and assessments.`,
      `Certificate upon completion.`,
      `Access to course materials.`
    ],
    Quiz: [
      `Immediate feedback on answers.`,
      `Score-based results.`,
      `Detailed explanations.`,
      `Shareable outcomes.`
    ],
    Trial: [
      `Full access to features.`,
      `No credit card required.`,
      `Easy setup process.`,
      `Dedicated support during trial.`
    ],
    Infographic: [
      `Visual representation of data.`,
      `Key statistics highlighted.`,
      `Engaging and informative design.`,
      `Easy to share and download.`
    ],
    Community: [
      `Connect with like-minded individuals.`,
      `Participate in discussions.`,
      `Access exclusive content.`,
      `Regular community events.`
    ],
    Challenge: [
      `Daily tasks to enhance skills.`,
      `Track your progress.`,
      `Motivational support.`,
      `Rewards upon completion.`
    ],
    Library: [
      `Extensive collection of materials.`,
      `Regularly updated content.`,
      `Easy navigation and search.`,
      `Downloadable resources.`
    ],
    ProductPicker: [
      `Personalized recommendations.`,
      `Compare various options.`,
      `User reviews and ratings.`,
      `Save your preferences.`
    ]
  };

  // Randomize content
  const titles = titleTemplates[type];
  const title = titles[Math.floor(Math.random() * titles.length)];
  const subheading = subTemplates[type];
  const bulletList = bullets[type];

  // Render to DOM
  document.getElementById('lead-title').textContent = title;
  document.getElementById('lead-subheading').textContent = subheading;

  const bulletsContainer = document.get
::contentReference[oaicite:55]{index=55}
 
