# East Cobb Carts Website

A modern, beautiful website for East Cobb Carts featuring a jumbotron-style design inspired by The Trade Desk and Palantir. This website showcases golf cart sales and services with a focus on professional presentation and user experience.

**🎯 NEW: Configuration-Driven Cart Management System**
The website now features a powerful JSON-based configuration system that allows easy management of cart inventory, pricing, specifications, and images without touching the code.

## 🚀 Features

### Design & Layout
- **Jumbotron Hero Section**: Large, impactful hero section with gradient backgrounds and floating elements
- **Modern Typography**: Clean, professional fonts with excellent readability
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Elegant hover effects, scroll animations, and loading transitions
- **Professional Color Scheme**: Sophisticated gradients and color combinations

### Dynamic Cart Management
- **JSON Configuration**: All cart data managed through `config/carts.json`
- **Automatic Image Loading**: Images loaded from organized folder structure
- **Dynamic Inventory**: Carts automatically appear/disappear based on availability
- **Modal Detail Views**: Rich cart detail popups with image galleries
- **Priority Sorting**: Control display order with priority settings
- **Status Management**: Featured, available, and sold status handling

### Sections
1. **Navigation**: Fixed navbar with smooth scrolling and mobile hamburger menu
2. **Hero Section**: Eye-catching jumbotron with company tagline, stats, and call-to-action buttons
3. **Services**: Comprehensive overview of all golf cart services offered
4. **Inventory**: Dynamic cart listings with detailed specifications (config-driven)
5. **About**: Company story and service areas
6. **Contact**: Contact information and functional contact form
7. **Footer**: Additional links and company information

### Interactive Features
- **Mobile Navigation**: Responsive hamburger menu for mobile devices
- **Smooth Scrolling**: Navigate between sections with smooth scroll animations
- **Contact Form**: Functional form with validation (currently shows alerts)
- **Cart Detail Modals**: Professional popup windows with full specifications
- **Image Galleries**: Multiple images per cart with thumbnail navigation
- **Click-to-Call**: Direct phone number links for mobile users

## 📁 File Structure

```
/
├── index.html              # Main HTML file with complete website structure
├── styles.css              # CSS styling with jumbotron design + modal styles
├── script.js               # JavaScript for interactivity + config loader
├── config/
│   └── carts.json          # Cart inventory configuration file
├── img/
│   └── karts/
│       ├── 2020_club_car_tempo/     # Club Car images
│       │   ├── image1.jpg
│       │   ├── image2.jpg
│       │   └── image3.jpg
│       └── 2023_yamaga_drive2/      # Yamaha images
│           ├── image1.jpg
│           ├── image2.jpg
│           ├── image3.jpg
│           └── image4.jpg
└── README.md               # This documentation file
```

## 🎨 Design Inspiration

The website design draws inspiration from modern SaaS companies like:
- **The Trade Desk**: Bold typography, gradient backgrounds, professional layout
- **Palantir**: Clean sections, sophisticated color schemes, jumbotron hero sections

## 🛠️ Technologies Used

- **HTML5**: Semantic markup and accessibility features
- **CSS3**: Modern styling with Flexbox, Grid, and animations
- **JavaScript (ES6+)**: Interactive features and configuration loading
- **JSON**: Dynamic cart data management
- **Font Awesome**: Professional icons throughout the site
- **Google Fonts**: Inter font family for modern typography
- **Local Images**: Organized cart photography system

## ⚙️ Configuration System

### Cart Data Management

All cart inventory is managed through the `config/carts.json` file. This system provides:

#### Cart Object Structure
```json
{
  "id": "unique_cart_identifier",
  "year": 2023,
  "make": "Yamaha",
  "model": "Drive 2",
  "package": "Sport Package",
  "status": "featured|available|sold",
  "condition": "new|used",
  "price": 7995,
  "pricingNote": "+ local sales tax",
  "description": "Short description",
  "longDescription": "Detailed description for modal",
  "imageFolder": "img/karts/folder_name",
  "mainImage": "img/karts/folder_name/main.jpg",
  "images": ["array", "of", "image", "paths"],
  "features": [
    {
      "name": "Feature name",
      "type": "motor|performance|wheels|warranty|etc"
    }
  ],
  "specifications": {
    "motor": "5kw AC motor",
    "suspension": "4 wheel independent"
  },
  "options": [
    {
      "name": "Lithium Ion batteries",
      "price": 1500,
      "description": "Upgrade description"
    }
  ],
  "available": true,
  "priority": 1
}
```

#### Settings Configuration
```json
{
  "settings": {
    "currency": "USD",
    "taxNote": "+ local sales tax",
    "defaultWarranty": "90-day ECC warranty",
    "displayOptions": {
      "showSoldItems": false,
      "maxItemsPerPage": 6,
      "sortBy": "priority",
      "featuredFirst": true
    }
  }
}
```

### Image Organization

Images should be organized in the following structure:
- Main folder: `img/karts/`
- Cart-specific folders: `img/karts/YEAR_MAKE_MODEL/`
- Multiple images per cart supported
- First image in array becomes the main display image

### Adding New Inventory

1. **Create image folder**: `img/karts/YEAR_MAKE_MODEL/`
2. **Add cart images** to the folder
3. **Add cart object** to `config/carts.json` inventory array
4. **Set priority** (lower number = higher priority)
5. **Set status** (featured/available/sold)
6. **Website updates automatically**

### Managing Inventory

- **Mark as sold**: Set `"available": false`
- **Feature a cart**: Set `"status": "featured"`
- **Change display order**: Adjust `"priority"` values
- **Hide sold items**: Set `"showSoldItems": false` in settings
- **Update pricing**: Modify `"price"` field

## 🚀 Getting Started

1. **Local Development**: Simply open `index.html` in a modern web browser
2. **Web Hosting**: Upload all files to your web hosting provider
3. **Domain Setup**: Point your domain to the hosting location

## 📱 Mobile Responsiveness

The website is fully responsive and optimized for:
- Desktop computers (1200px+)
- Tablets (768px - 1199px)
- Mobile phones (320px - 767px)

## 🎯 Key Business Information

### Contact Details
- **Phone**: 404-669-6980 (click-to-call enabled)
- **Email**: wrench@eastcobbcarts.com
- **Service Areas**: East Cobb & Roswell, GA (ZIP codes: 30068, 30067, 30062, 30075)

### Services Offered
- Golf cart sales (new and pre-owned)
- Repair and diagnostic services
- Battery replacement and lithium upgrades
- Custom wheels and tire installations
- Lift kits and suspension upgrades
- Comfort and luxury additions
- Performance modifications
- Pickup and delivery service

### Current Inventory Management
The inventory is now completely managed through the configuration file:
- **Featured**: 2023 Yamaha Drive 2 ($7,995)
- **Available**: Multiple Club Car Tempo and Yamaha Drive 2 models
- **Pricing**: All pricing automatically formatted with tax notes
- **Status**: Real-time availability management

## 🔧 Customization Options

### Colors
The website uses CSS custom properties for easy color customization. Main colors:
- Primary gradient: `#667eea` to `#764ba2`
- Text colors: `#1a1a1a` (dark) and `#6b7280` (medium)
- Background: `#ffffff` (white) with gradient overlays

### Content Updates
- **Cart Inventory**: Edit `config/carts.json`
- **Services**: Update HTML in `#services` section
- **Contact Info**: Update multiple locations in HTML
- **Company Story**: Modify `#about` section

### Images
- **Cart Photos**: Add to appropriate folders in `img/karts/`
- **Hero Section**: Updates automatically from featured cart
- **Service Images**: Replace with actual business photos

## 📈 Performance Features

- **Lazy Loading**: Images load on demand for faster initial load
- **Optimized Images**: Proper image sizing recommendations
- **Smooth Animations**: Hardware-accelerated CSS transitions
- **Mobile-First**: Responsive design prioritizing mobile experience
- **Fast Loading**: Minimal dependencies and optimized code
- **SEO Ready**: Semantic HTML and proper meta tags

## 🎪 Interactive Elements

- **Dynamic Cart Loading**: JSON-driven inventory display
- **Modal Detail Views**: Professional cart detail popups
- **Image Galleries**: Multiple photos with thumbnail navigation
- **Service Cards**: Hover effects and interactive elements
- **Contact Forms**: Form validation and submission handling
- **Phone Links**: Direct calling capability on mobile devices
- **Smooth Navigation**: Scroll-to-section functionality

## 💻 Browser Support

Compatible with all modern browsers:
- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📞 Next Steps

1. **Add Real Images**: Replace example images with actual cart photos
2. **Update Inventory**: Modify `config/carts.json` with current stock
3. **Form Integration**: Connect contact form to email service or CRM
4. **Analytics**: Add Google Analytics for visitor tracking
5. **SEO Optimization**: Add meta descriptions and structured data
6. **Social Media**: Connect social media accounts to footer links

## 🏆 Key Improvements Over Original

- **Configuration-Driven**: Easy inventory management vs. hardcoded HTML
- **Dynamic Content**: JSON-based cart system vs. static listings
- **Professional Modals**: Rich detail views vs. basic information
- **Image Management**: Organized folder system vs. random images
- **Modern Design**: Professional jumbotron-style layout vs. basic HTML
- **Mobile Optimized**: Fully responsive vs. desktop-only
- **Interactive Features**: Dynamic elements vs. static content
- **Status Management**: Sold/featured/available vs. manual updates

## 🛠️ Configuration Management

### Daily Operations
- **New Arrivals**: Add to JSON config and image folder
- **Sales**: Mark `"available": false` in config
- **Price Changes**: Update `"price"` field in config
- **Feature Changes**: Modify `"status"` field

### Maintenance
- **Image Optimization**: Compress images for web performance
- **Config Validation**: Ensure JSON syntax is correct
- **Backup**: Keep backups of config file before major changes
- **Testing**: Verify changes in browser before publishing

---

*This website represents a complete redesign of the East Cobb Carts online presence, transforming it from a basic HTML site into a modern, professional, configuration-driven business website that makes inventory management effortless while providing an exceptional user experience.* 