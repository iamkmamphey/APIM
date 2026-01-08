import { useState } from 'react';
import { Heart, Calendar, Users, BookOpen, Phone, Mail, Globe, Menu, X, Edit, Save, Trash2, Plus, MessageCircle } from 'lucide-react';

const APIMWebsite = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  
  // Editable content state
  const [content, setContent] = useState({
    event: {
      title: "Watch And Pray",
      subtitle: "A 14 Day Watch",
      time: "11 pm USA 🇺🇸 CST / 5 am GMT",
      dates: "19th to 31st January 2026",
      duration: "One Hour",
      theme: "He Spoke a Parable Unto Them, Saying, Men Ought to Pray Always",
      subtitle2: "APIM Fresh Start"
    },
    contacts: {
      phone1: "+1 (832) 503-9564",
      phone2: "+233 55 716 7055",
      donationContact1: "+233549433163 (Miss Nancy)",
      donationContact2: "+233557167055 (Miss Paulina)"
    },
    links: {
      googleMeet: "https://meet.google.com/usi-fajr-jib",
      tiktok: "https://vm.tiktok.com/ZMHKwwSJbAj9r-Syq8z/",
      whatsapp: "https://call.whatsapp.com/video/YUNHjZAXcsi9XzpjK2VCd8"
    },
    gallery: [
      { id: 1, url: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800", caption: "Prayer Service" },
      { id: 2, url: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800", caption: "Community Outreach" },
      { id: 3, url: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800", caption: "Youth Ministry" },
      { id: 4, url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800", caption: "Worship Service" },
      { id: 5, url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800", caption: "Ministry Team" },
      { id: 6, url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800", caption: "Community Love" }
    ],
    about: {
      mission: "Our mission is to create a global community united in prayer, demonstrating Christ's love, and facilitating restoration in every life we touch. We believe that through consistent prayer and genuine compassion, we can bring hope and transformation to individuals, families, and communities.",
      vision: "To be a beacon of hope and spiritual renewal, where no one is left behind. We envision a world where prayer connects hearts, love bridges divides, and restoration brings new beginnings to all who seek God's presence.",
      values: "Prayer • Love • Restoration • Community • Faith • Hope"
    }
  });

  const [editMode, setEditMode] = useState<{[key: string]: boolean}>({});

  const handleAdminLogin = () => {
    if (adminPassword === 'APIM2026') {
      setIsAdmin(true);
      setShowAdminLogin(false);
      setAdminPassword('');
    } else {
      alert('Incorrect password');
    }
  };

  const handleContentEdit = (section: string, field: string, value: string) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const addGalleryImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const caption = prompt('Enter caption for this image:');
          const result = event.target?.result;
          if (caption && result && typeof result === 'string') {
            setContent(prev => ({
              ...prev,
              gallery: [...prev.gallery, { id: Date.now(), url: result, caption }]
            }));
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const deleteGalleryImage = (id: number) => {
    if (confirm('Delete this image?')) {
      setContent(prev => ({
        ...prev,
        gallery: prev.gallery.filter(img => img.id !== id)
      }));
    }
  };

  const NavBar = () => (
    <nav className="bg-blue-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentPage('home')}>
            <div className="w-16 h-16 flex items-center justify-center">
              <img src="/logo.png" alt="APIM Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-xl font-bold">APIM</h1>
              <p className="text-xs text-gray-300">We Leave No One Behind</p>
            </div>
          </div>
          
          <div className="hidden md:flex space-x-6">
            {['home', 'about', 'gallery', 'contact'].map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`capitalize px-4 py-2 rounded-lg transition-all ${
                  currentPage === page ? 'bg-purple-700' : 'hover:bg-blue-800'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => isAdmin ? setShowAdminPanel(true) : setShowAdminLogin(true)}
              className="px-4 py-2 rounded-lg bg-purple-700 hover:bg-purple-800 transition-all"
            >
              {isAdmin ? '⚙️ Admin Panel' : 'Admin'}
            </button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {['home', 'about', 'gallery', 'contact'].map(page => (
              <button
                key={page}
                onClick={() => {
                  setCurrentPage(page);
                  setMobileMenuOpen(false);
                }}
                className={`capitalize w-full text-left px-4 py-2 rounded-lg ${
                  currentPage === page ? 'bg-red-600' : 'hover:bg-gray-700'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => {
                setShowAdminLogin(true);
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2 rounded-lg bg-purple-700 hover:bg-purple-800"
            >
              {isAdmin ? '⚙️ Admin Panel' : 'Admin'}
            </button>
          </div>
        )}
      </div>
    </nav>
  );

  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section with Banner */}
      <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white overflow-hidden h-[500px] md:h-[600px]">
        <div className="absolute inset-0">
          <img 
            src="/banner.jpg" 
            alt="APIM Banner - Prophet Emmanuel A. Boadi" 
            className="w-full h-full object-cover object-top md:object-center"
          />
          <div className="absolute inset-0 bg-black/70"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <div className="mb-6 animate-fade-in">
              <img src="/logo.png" alt="APIM Logo" className="w-20 h-20 md:w-24 md:h-24 mb-4" />
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-2xl">
              Arena of Prayer International Ministry
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl mb-6 font-semibold drop-shadow-2xl">We Leave No One Behind</p>
            <div className="flex flex-wrap gap-3 text-base md:text-lg">
              <div className="flex items-center gap-2 bg-purple-700 backdrop-blur-md px-4 md:px-6 py-2 md:py-3 rounded-full border border-white/30 shadow-lg">
                <Heart className="text-white" size={20} />
                <span className="font-semibold">Prayer</span>
              </div>
              <div className="flex items-center gap-2 bg-purple-700 backdrop-blur-md px-4 md:px-6 py-2 md:py-3 rounded-full border border-white/30 shadow-lg">
                <Heart className="text-white" size={20} />
                <span className="font-semibold">Love</span>
              </div>
              <div className="flex items-center gap-2 bg-purple-700 backdrop-blur-md px-4 md:px-6 py-2 md:py-3 rounded-full border border-white/30 shadow-lg">
                <Heart className="text-white" size={20} />
                <span className="font-semibold">Restoration</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Event Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-white rounded-xl shadow-xl p-8 md:p-12 border-l-4 border-purple-700 relative">
          {isAdmin && (
            <button
              onClick={() => setEditMode(prev => ({ ...prev, event: !prev.event }))}
              className="absolute top-4 right-4 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 shadow-lg transition"
            >
              {editMode.event ? <Save size={20} /> : <Edit size={20} />}
            </button>
          )}
          
          <div className="text-center mb-8">
            <div className="inline-block bg-purple-700 text-white px-8 py-3 rounded-lg text-sm font-bold mb-6 uppercase tracking-wider shadow-md">
              Upcoming Event
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
              {editMode.event ? (
                <input
                  value={content.event.title}
                  onChange={(e) => handleContentEdit('event', 'title', e.target.value)}
                  className="w-full border-2 border-blue-300 rounded px-3 py-2 text-center"
                />
              ) : content.event.title}
            </h2>
            <p className="text-2xl text-gray-600 mb-6 font-medium">
              {editMode.event ? (
                <input
                  value={content.event.subtitle}
                  onChange={(e) => handleContentEdit('event', 'subtitle', e.target.value)}
                  className="w-full border-2 border-blue-300 rounded px-3 py-2 text-center"
                />
              ) : content.event.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-start gap-3 bg-blue-50 p-5 rounded-lg shadow-sm border border-blue-100">
                <Calendar className="text-blue-600 mt-1 flex-shrink-0" size={28} />
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 mb-2 text-lg">⏰ Time</h3>
                  {editMode.event ? (
                    <input
                      value={content.event.time}
                      onChange={(e) => handleContentEdit('event', 'time', e.target.value)}
                      className="w-full border-2 border-blue-300 rounded px-2 py-1"
                    />
                  ) : (
                    <p className="text-gray-700">{content.event.time}</p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3 bg-purple-50 p-5 rounded-lg shadow-sm border border-purple-100">
                <Calendar className="text-purple-600 mt-1 flex-shrink-0" size={28} />
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 mb-2 text-lg">📅 Dates</h3>
                  {editMode.event ? (
                    <input
                      value={content.event.dates}
                      onChange={(e) => handleContentEdit('event', 'dates', e.target.value)}
                      className="w-full border-2 border-blue-300 rounded px-2 py-1"
                    />
                  ) : (
                    <p className="text-gray-700">{content.event.dates}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 bg-green-50 p-5 rounded-lg shadow-sm border border-green-100">
                <Users className="text-green-600 mt-1 flex-shrink-0" size={28} />
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 mb-2 text-lg">⏱️ Duration</h3>
                  {editMode.event ? (
                    <input
                      value={content.event.duration}
                      onChange={(e) => handleContentEdit('event', 'duration', e.target.value)}
                      className="w-full border-2 border-blue-300 rounded px-2 py-1"
                    />
                  ) : (
                    <p className="text-gray-700">{content.event.duration}</p>
                  )}
                </div>
              </div>

              <div className="bg-yellow-50 p-5 rounded-lg shadow-sm border border-yellow-100">
                <h3 className="font-bold text-gray-800 mb-3 text-lg">📖 Theme</h3>
                {editMode.event ? (
                  <textarea
                    value={content.event.theme}
                    onChange={(e) => handleContentEdit('event', 'theme', e.target.value)}
                    className="w-full border-2 border-blue-300 rounded px-3 py-2"
                    rows={3}
                  />
                ) : (
                  <p className="text-gray-700 italic leading-relaxed">{content.event.theme}</p>
                )}
              </div>
            </div>
          </div>

          <div className="text-center bg-gradient-to-r from-purple-700 to-blue-900 text-white py-6 rounded-lg shadow-lg">
            <p className="text-2xl font-bold">
              {editMode.event ? (
                <input
                  value={content.event.subtitle2}
                  onChange={(e) => handleContentEdit('event', 'subtitle2', e.target.value)}
                  className="w-full border-2 border-white rounded px-3 py-2 text-gray-800 text-center"
                />
              ) : content.event.subtitle2}
            </p>
          </div>
        </div>

        {/* Join Online Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-900 to-purple-700 text-white rounded-xl shadow-xl p-8">
          <h3 className="text-3xl font-bold mb-8 text-center">🌐 Join Us Online</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <a
              href={content.links.googleMeet}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-600 p-8 rounded-2xl text-center hover:scale-105 transition-transform cursor-pointer shadow-lg group"
            >
              <Globe size={48} className="mx-auto mb-4 group-hover:rotate-12 transition-transform" />
              <p className="font-bold text-lg">Google Meet</p>
              <p className="text-sm text-gray-600 mt-2">Join via web</p>
            </a>
            <a
              href={content.links.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-600 p-8 rounded-2xl text-center hover:scale-105 transition-transform cursor-pointer shadow-lg group"
            >
              <Users size={48} className="mx-auto mb-4 group-hover:rotate-12 transition-transform" />
              <p className="font-bold text-lg">TikTok Live</p>
              <p className="text-sm text-gray-600 mt-2">Watch live stream</p>
            </a>
            <a
              href={content.links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-600 p-8 rounded-2xl text-center hover:scale-105 transition-transform cursor-pointer shadow-lg group"
            >
              <Phone size={48} className="mx-auto mb-4 group-hover:rotate-12 transition-transform" />
              <p className="font-bold text-lg">WhatsApp Call</p>
              <p className="text-sm text-gray-600 mt-2">Video conference</p>
            </a>
          </div>
        </div>

        {/* Orphanage Support Section */}
        <div className="mt-12 bg-green-600 text-white rounded-xl shadow-xl p-8">
          <div className="text-center mb-6">
            <Heart size={56} className="mx-auto mb-4 animate-pulse" />
            <h3 className="text-3xl md:text-4xl font-bold mb-3">Support Our Orphanage Program</h3>
            <p className="text-xl">Making a difference in Ghana 🇬🇭</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-8 shadow-md">
            <h4 className="font-bold text-xl mb-6 text-center">💝 Donation Contacts</h4>
            <div className="space-y-4 text-lg">
              <div className="bg-white/20 backdrop-blur p-4 rounded-lg">
                <p className="font-semibold">📞 {content.contacts.donationContact1}</p>
              </div>
              <div className="bg-white/20 backdrop-blur p-4 rounded-lg">
                <p className="font-semibold">📞 {content.contacts.donationContact2}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const AboutPage = () => (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">About APIM</h1>
          <p className="text-2xl text-purple-600 font-semibold">We Leave No One Behind</p>
        </div>

        {/* Prophet Section */}
        <div className="bg-white rounded-lg shadow-xl p-8 mb-12">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-1">
              <img 
                src="/prophet.jpg" 
                alt="Prophet Emmanuel Boadi" 
                className="w-full rounded-lg shadow-lg object-cover"
              />
            </div>
            <div className="md:col-span-2">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Prophet Emmanuel Boadi</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Prophet Emmanuel Boadi is an anointed servant of God who, by grace, has walked and worked under a strong prophetic mantle for decades. His ministry is marked by divine utterances that bring clarity, healing, and transformation—changing lives and reshaping destinies. He leads APIM (All People International Ministry), a non-denominational prophetic prayer movement that gathers people from across the globe through online prayer meetings, while also convening powerful face-to-face encounters in Houston, Texas, and Ghana. Through prayer, prophecy, and the power of the Holy Spirit, APIM continues to unite nations and generations in pursuit of God's purpose.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-purple-700 relative hover:shadow-xl transition-shadow">
            {isAdmin && (
              <button
                onClick={() => setEditMode(prev => ({ ...prev, mission: !prev.mission }))}
                className="absolute top-4 right-4 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 shadow-lg"
              >
                {editMode.mission ? <Save size={20} /> : <Edit size={20} />}
              </button>
            )}
            <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-3">
              <Heart className="text-red-600" size={36} />
              Our Mission
            </h2>
            {editMode.mission ? (
              <textarea
                value={content.about.mission}
                onChange={(e) => handleContentEdit('about', 'mission', e.target.value)}
                className="w-full border-2 border-blue-300 rounded px-3 py-2 h-48"
              />
            ) : (
              <p className="text-gray-700 leading-relaxed text-lg">{content.about.mission}</p>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-purple-600 relative hover:shadow-xl transition-shadow">
            {isAdmin && (
              <button
                onClick={() => setEditMode(prev => ({ ...prev, vision: !prev.vision }))}
                className="absolute top-4 right-4 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 shadow-lg"
              >
                {editMode.vision ? <Save size={20} /> : <Edit size={20} />}
              </button>
            )}
            <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-3">
              <BookOpen className="text-purple-600" size={36} />
              Our Vision
            </h2>
            {editMode.vision ? (
              <textarea
                value={content.about.vision}
                onChange={(e) => handleContentEdit('about', 'vision', e.target.value)}
                className="w-full border-2 border-blue-300 rounded px-3 py-2 h-48"
              />
            ) : (
              <p className="text-gray-700 leading-relaxed text-lg">{content.about.vision}</p>
            )}
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-900 to-purple-700 text-white rounded-lg shadow-xl p-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">✨ Our Core Values</h2>
          <p className="text-2xl md:text-3xl font-semibold">{content.about.values}</p>
        </div>
      </div>
    </div>
  );

  const GalleryPage = () => (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">📸 Our Gallery</h1>
          <p className="text-xl text-gray-600">Capturing moments of faith, love, and community</p>
        </div>

        {isAdmin && (
          <div className="text-center mb-8">
            <button
              onClick={addGalleryImage}
              className="bg-green-600 text-white px-8 py-3 rounded-xl hover:bg-green-700 flex items-center gap-2 mx-auto shadow-lg hover:shadow-xl transition-all"
            >
              <Plus size={24} />
              <span className="font-semibold">Add New Image</span>
            </button>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.gallery.map((image) => (
            <div key={image.id} className="relative group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all hover:scale-105">
                <div className="relative overflow-hidden h-64">
                  <img
                    src={image.url}
                    alt={image.caption}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <p className="text-center font-bold text-gray-800 text-lg">{image.caption}</p>
                </div>
              </div>
              {isAdmin && (
                <button
                  onClick={() => deleteGalleryImage(image.id)}
                  className="absolute top-3 right-3 bg-red-600 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-700"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ContactPage = () => (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">📞 Contact Us</h1>
          <p className="text-xl text-gray-600">We'd love to hear from you</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Get In Touch</h2>
            <div className="space-y-5">
              <div className="flex items-start gap-4 p-5 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                <Phone className="text-blue-600 mt-1 flex-shrink-0" size={28} />
                <div>
                  <p className="font-bold text-gray-800 text-lg mb-2">📱 Phone Numbers</p>
                  <p className="text-gray-700 font-medium">{content.contacts.phone1}</p>
                  <p className="text-gray-700 font-medium">{content.contacts.phone2}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
                <Mail className="text-green-600 mt-1 flex-shrink-0" size={28} />
                <div>
                  <p className="font-bold text-gray-800 text-lg mb-2">🌐 Follow Us</p>
                  <p className="text-gray-700">Connect with us on all social media platforms</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-700 to-blue-900 text-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
            <p className="text-lg mb-8 leading-relaxed">
              Become part of a global family united in prayer, love, and restoration. 
              Together, we leave no one behind.
            </p>
            <div className="space-y-4">
              <button className="w-full bg-white text-purple-700 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition shadow-md">
                🙏 Join Prayer Group
              </button>
              <button className="w-full bg-purple-800 text-white py-4 rounded-lg font-bold text-lg hover:bg-purple-900 transition shadow-md">
                🤝 Partner With Us
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
          <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            💚 Support Our Orphanage Program in Ghana
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-green-100 to-green-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <h4 className="font-bold text-gray-800 mb-3 text-xl">Contact Person 1</h4>
              <p className="text-gray-800 text-lg font-medium">{content.contacts.donationContact1}</p>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-green-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <h4 className="font-bold text-gray-800 mb-3 text-xl">Contact Person 2</h4>
              <p className="text-gray-800 text-lg font-medium">{content.contacts.donationContact2}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const AdminLoginModal = () => (
    showAdminLogin && (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
        <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-xl">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">🔐 Admin Login</h2>
          <input
            type="password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            placeholder="Enter admin password"
            className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 mb-6 text-lg focus:border-blue-500 focus:outline-none"
            onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
          />
          <div className="flex gap-4">
            <button
              onClick={handleAdminLogin}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold shadow-md transition"
            >
              Login
            </button>
            <button
              onClick={() => {
                setShowAdminLogin(false);
                setAdminPassword('');
              }}
              className="flex-1 bg-gray-300 text-gray-800 py-3 rounded-lg hover:bg-gray-400 font-semibold shadow-md transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  );

  const ChatbotModal = () => (
    showChatbot && (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
        <div className="bg-white rounded-lg w-full max-w-3xl h-[80vh] shadow-xl flex flex-col">
          <div className="bg-gradient-to-r from-purple-700 to-blue-900 text-white p-6 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MessageCircle size={32} />
              <div>
                <h2 className="text-2xl font-bold">Chat with Our Counselor</h2>
                <p className="text-sm text-purple-100">We're here to help and support you</p>
              </div>
            </div>
            <button
              onClick={() => setShowChatbot(false)}
              className="hover:bg-white/20 p-2 rounded-full transition"
            >
              <X size={28} />
            </button>
          </div>
          <div className="flex-1 overflow-hidden">
            <iframe
              src="https://iamkmn8n.app.n8n.cloud/webhook/3492a80a-b5a7-4ca5-becb-94355122a30c/chat"
              className="w-full h-full border-0"
              title="APIM Counselor Chatbot"
            />
          </div>
        </div>
      </div>
    )
  );

  const AdminPanel = () => (
    showAdminPanel && isAdmin && (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm overflow-y-auto">
        <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto shadow-2xl">
          <div className="bg-gradient-to-r from-purple-700 to-blue-900 text-white p-6 rounded-t-lg flex items-center justify-between sticky top-0 z-10">
            <h2 className="text-3xl font-bold">⚙️ Admin Control Panel</h2>
            <button
              onClick={() => setShowAdminPanel(false)}
              className="hover:bg-white/20 p-2 rounded-full transition"
            >
              <X size={28} />
            </button>
          </div>
          
          <div className="p-8 space-y-8">
            {/* Event Section */}
            <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-purple-700">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Calendar size={24} className="text-purple-700" />
                Event Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Event Title</label>
                  <input
                    value={content.event.title}
                    onChange={(e) => handleContentEdit('event', 'title', e.target.value)}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-purple-700 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Subtitle</label>
                  <input
                    value={content.event.subtitle}
                    onChange={(e) => handleContentEdit('event', 'subtitle', e.target.value)}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-purple-700 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Time</label>
                  <input
                    value={content.event.time}
                    onChange={(e) => handleContentEdit('event', 'time', e.target.value)}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-purple-700 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Dates</label>
                  <input
                    value={content.event.dates}
                    onChange={(e) => handleContentEdit('event', 'dates', e.target.value)}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-purple-700 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Duration</label>
                  <input
                    value={content.event.duration}
                    onChange={(e) => handleContentEdit('event', 'duration', e.target.value)}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-purple-700 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Subtitle 2</label>
                  <input
                    value={content.event.subtitle2}
                    onChange={(e) => handleContentEdit('event', 'subtitle2', e.target.value)}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-purple-700 focus:outline-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Theme</label>
                  <textarea
                    value={content.event.theme}
                    onChange={(e) => handleContentEdit('event', 'theme', e.target.value)}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-purple-700 focus:outline-none"
                    rows={3}
                  />
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-blue-700">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <BookOpen size={24} className="text-blue-700" />
                About Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Mission Statement</label>
                  <textarea
                    value={content.about.mission}
                    onChange={(e) => handleContentEdit('about', 'mission', e.target.value)}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-blue-700 focus:outline-none"
                    rows={4}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Vision Statement</label>
                  <textarea
                    value={content.about.vision}
                    onChange={(e) => handleContentEdit('about', 'vision', e.target.value)}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-blue-700 focus:outline-none"
                    rows={4}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Core Values</label>
                  <input
                    value={content.about.values}
                    onChange={(e) => handleContentEdit('about', 'values', e.target.value)}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-blue-700 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-green-700">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Phone size={24} className="text-green-700" />
                Contact Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone 1</label>
                  <input
                    value={content.contacts.phone1}
                    onChange={(e) => handleContentEdit('contacts', 'phone1', e.target.value)}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-green-700 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone 2</label>
                  <input
                    value={content.contacts.phone2}
                    onChange={(e) => handleContentEdit('contacts', 'phone2', e.target.value)}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-green-700 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Donation Contact 1</label>
                  <input
                    value={content.contacts.donationContact1}
                    onChange={(e) => handleContentEdit('contacts', 'donationContact1', e.target.value)}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-green-700 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Donation Contact 2</label>
                  <input
                    value={content.contacts.donationContact2}
                    onChange={(e) => handleContentEdit('contacts', 'donationContact2', e.target.value)}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-green-700 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Links Section */}
            <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-indigo-700">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Globe size={24} className="text-indigo-700" />
                Online Meeting Links
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Google Meet Link</label>
                  <input
                    value={content.links.googleMeet}
                    onChange={(e) => handleContentEdit('links', 'googleMeet', e.target.value)}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-indigo-700 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">TikTok Link</label>
                  <input
                    value={content.links.tiktok}
                    onChange={(e) => handleContentEdit('links', 'tiktok', e.target.value)}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-indigo-700 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">WhatsApp Link</label>
                  <input
                    value={content.links.whatsapp}
                    onChange={(e) => handleContentEdit('links', 'whatsapp', e.target.value)}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-indigo-700 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Gallery Management */}
            <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-purple-700">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Users size={24} className="text-purple-700" />
                Gallery Management
              </h3>
              <button
                onClick={addGalleryImage}
                className="bg-purple-700 text-white px-6 py-3 rounded-lg hover:bg-purple-800 flex items-center gap-2 mb-4 shadow-md"
              >
                <Plus size={20} />
                Add New Image (From Computer)
              </button>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {content.gallery.map((image) => (
                  <div key={image.id} className="relative group">
                    <img src={image.url} alt={image.caption} className="w-full h-32 object-cover rounded-lg" />
                    <p className="text-xs mt-1 text-gray-600">{image.caption}</p>
                    <button
                      onClick={() => deleteGalleryImage(image.id)}
                      className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Save Notice */}
            <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded-lg">
              <p className="text-green-800 font-semibold">✅ All changes are automatically saved and reflected on the website immediately.</p>
            </div>
          </div>
        </div>
      </div>
    )
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'about' && <AboutPage />}
      {currentPage === 'gallery' && <GalleryPage />}
      {currentPage === 'contact' && <ContactPage />}
      <AdminLoginModal />
      <ChatbotModal />
      <AdminPanel />
      
      {/* Floating Chatbot Button */}
      <button
        onClick={() => setShowChatbot(true)}
        className="fixed bottom-24 right-4 bg-gradient-to-r from-purple-700 to-blue-900 text-white p-4 rounded-full shadow-xl hover:shadow-purple-500/50 hover:scale-110 transition-all z-40 group"
        title="Chat with our counselor"
      >
        <MessageCircle size={32} className="group-hover:rotate-12 transition-transform" />
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
          💬
        </span>
      </button>
      
      {isAdmin && (
        <div className="fixed bottom-4 right-4 bg-gradient-to-r from-purple-700 to-blue-900 text-white px-6 py-3 rounded-full shadow-xl font-bold flex items-center gap-2">
          ✓ Admin Mode
          <button
            onClick={() => setShowAdminPanel(true)}
            className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full text-sm transition"
          >
            ⚙️ Panel
          </button>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-16 h-16 flex items-center justify-center">
                <img src="/logo.png" alt="APIM Logo" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-2xl font-bold">Arena of Prayer International Ministry</h3>
            </div>
            <p className="text-xl text-gray-300 font-semibold mb-2">We Leave No One Behind</p>
            <p className="text-gray-400">Prayer • Love • Restoration</p>
          </div>
          
          <div className="border-t border-gray-700 pt-6 text-center">
            <p className="text-sm text-gray-400">
              © 2026 APIM. All rights reserved. Built with love and faith.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default APIMWebsite;