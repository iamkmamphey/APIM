import React, { useState } from 'react';
import { Heart, Calendar, Users, BookOpen, Phone, Mail, Globe, Menu, X, Edit, Save, Trash2, Plus, MessageCircle } from 'lucide-react';

const APIMWebsite = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  
  // Load saved content from localStorage
  const loadSavedContent = () => {
    const saved = localStorage.getItem('apimContent');
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      event: {
        title: "Watch And Pray",
        subtitle: "A 14 Day Watch",
        time: "11 pm USA 🇺🇸 CST / 5 am GMT",
        dates: "19th to 31st January 2026",
        duration: "One Hour",
        theme: "He Spoke a Parable Unto Them, Saying, Men Ought to Pray Always",
        subtitle2: "APIM Fresh Start",
        location: "Google Meet & WhatsApp",
        videoUrl: ""
      },
      contacts: {
        phone1: "+1 (832) 503-9564",
        phone2: "+233 55 716 7055",
        donationContact1: "+233 549 433 163 (Miss Nancy)",
        donationContact2: "+233 557 167055 (Miss Paulina)"
      },
      links: {
        googleMeet: "https://meet.google.com/usi-fajr-jib",
        tiktok: "https://vm.tiktok.com/ZMHKwwSJbAj9r-Syq8z/",
        whatsapp: "https://call.whatsapp.com/video/YUNHjZAXcsi9XzpjK2VCd8"
      },
      gallery: [
        { id: 1, url: "/gallery-1.jpg", caption: "Orphanage Outreach - Ghana", type: "image" },
        { id: 2, url: "/gallery-2.jpg", caption: "On Fire for GOD", type: "image" },
        { id: 3, url: "/gallery-3.jpg", caption: "The Prophet's Prophet Agyemang", type: "image" },
        { id: 4, url: "/gallery-4.jpg", caption: "Prophet Emmanuel Boadi", type: "image" },
        { id: 5, url: "/gallery-5.jpg", caption: "Prophetess Paulina", type: "image" },
        { id: 6, url: "/gallery-6.jpg", caption: "Fellow Member (KM)", type: "image" },
        { id: 7, url: "/gallery-7.jpg", caption: "Prophet Emmanuel Boadi", type: "image" },
        { id: 8, url: "/anthem.mp3", caption: "APIM Anthem", type: "audio" }
      ],
      about: {
        mission: "Our mission is to create a global community united in prayer, demonstrating Christ's love, and facilitating restoration in every life we touch. We believe that through consistent prayer and genuine compassion, we can bring hope and transformation to individuals, families, and communities.",
        vision: "To be a beacon of hope and spiritual renewal, where no one is left behind. We envision a world where prayer connects hearts, love bridges divides, and restoration brings new beginnings to all who seek God's presence.",
        values: "Prayer • Love • Restoration • Community • Faith • Hope"
      }
    };
  };

  // Editable content state
  const [content, setContent] = useState(loadSavedContent());

  // Save content to localStorage
  const saveContent = () => {
    localStorage.setItem('apimContent', JSON.stringify(content));
    alert('✅ Content saved successfully!');
  };

  const [editMode, setEditMode] = useState<{[key: string]: boolean}>({});

  const handleAdminLogin = () => {
    if (adminPassword === 'ADMIN2026') {
      setIsAdmin(true);
      setShowAdminLogin(false);
      setAdminPassword('');
    } else {
      alert('Incorrect password');
    }
  };

  const handleContentEdit = (section: string, field: string, value: string) => {
    setContent((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const addGalleryImage = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*,video/*,audio/*';
    fileInput.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const caption = prompt('Enter caption:');
          if (caption) {
            let type = 'image';
            if (file.type.startsWith('video/')) type = 'video';
            if (file.type.startsWith('audio/')) type = 'audio';
            
            setContent((prev: any) => ({
              ...prev,
              gallery: [...prev.gallery, { 
                id: Date.now(), 
                url: event.target?.result as string, 
                caption,
                type
              }]
            }));
          }
        };
        reader.readAsDataURL(file);
      }
    };
    fileInput.click();
  };

  const deleteGalleryImage = (id: number) => {
    if (confirm('Delete this image?')) {
      setContent((prev: any) => ({
        ...prev,
        gallery: prev.gallery.filter((img: any) => img.id !== id)
      }));
    }
  };

  const NavBar = () => (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentPage('home')}>
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <Heart className="text-red-600" size={24} />
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
                  currentPage === page ? 'bg-red-600' : 'hover:bg-gray-700'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setShowAdminLogin(true)}
              className="px-4 py-2 rounded-lg bg-yellow-600 hover:bg-yellow-700 transition-all"
            >
              {isAdmin ? '✓ Admin' : 'Admin'}
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
              className="w-full text-left px-4 py-2 rounded-lg bg-yellow-600 hover:bg-yellow-700"
            >
              {isAdmin ? '✓ Admin' : 'Admin'}
            </button>
          </div>
        )}
      </div>
    </nav>
  );

  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-red-600 via-purple-600 to-indigo-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-black"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Arena of Prayer International Ministry
          </h1>
          <p className="text-2xl md:text-3xl mb-8 font-semibold">We Leave No One Behind</p>
          <div className="flex flex-wrap justify-center gap-4 text-lg">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur px-6 py-3 rounded-full">
              <Heart className="text-red-300" size={24} />
              <span className="font-semibold">Prayer</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur px-6 py-3 rounded-full">
              <Heart className="text-red-300" size={24} />
              <span className="font-semibold">Love</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur px-6 py-3 rounded-full">
              <Heart className="text-red-300" size={24} />
              <span className="font-semibold">Restoration</span>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Event Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-t-8 border-red-600 relative">
          {isAdmin && (
            <button
              onClick={() => setEditMode(prev => ({ ...prev, event: !prev.event }))}
              className="absolute top-4 right-4 bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 shadow-lg transition"
            >
              {editMode.event ? <Save size={20} /> : <Edit size={20} />}
            </button>
          )}
          
          <div className="text-center mb-8">
            <div className="inline-block bg-red-100 text-red-600 px-6 py-2 rounded-full text-sm font-semibold mb-4 uppercase tracking-wide">
              ⭐ Upcoming Event
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-2">
              {editMode.event ? (
                <input
                  value={content.event.title}
                  onChange={(e) => handleContentEdit('event', 'title', e.target.value)}
                  className="w-full border-2 border-blue-300 rounded px-3 py-2 text-center"
                />
              ) : (
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white px-6 py-3 rounded-xl inline-block shadow-lg">
                  {content.event.title}
                </span>
              )}
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
              <div className="flex items-start gap-3 bg-gradient-to-r from-blue-50 to-blue-100 p-5 rounded-xl shadow-sm">
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

              <div className="flex items-start gap-3 bg-gradient-to-r from-purple-50 to-purple-100 p-5 rounded-xl shadow-sm">
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
              <div className="flex items-start gap-3 bg-gradient-to-r from-purple-50 to-purple-100 p-5 rounded-xl shadow-sm">
                <Users className="text-purple-600 mt-1 flex-shrink-0" size={28} />
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

              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-5 rounded-xl shadow-sm">
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

          <div className="mb-6 text-center">
            <div className="inline-block bg-gradient-to-r from-purple-50 to-indigo-100 p-4 rounded-xl shadow-sm">
              <h3 className="font-bold text-gray-800 mb-2 text-lg">📍 Location</h3>
              {editMode.event ? (
                <input
                  value={content.event.location}
                  onChange={(e) => handleContentEdit('event', 'location', e.target.value)}
                  className="w-full border-2 border-blue-300 rounded px-3 py-2 text-center"
                />
              ) : (
                <p className="text-gray-700 font-semibold">{content.event.location}</p>
              )}
            </div>
          </div>

          <div className="text-center bg-gradient-to-r from-red-500 via-purple-600 to-indigo-600 text-white py-5 rounded-xl shadow-lg">
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

          {/* YouTube Video Section */}
          {(editMode.event || content.event.videoUrl) && (
            <div className="mt-6">
              {editMode.event ? (
                <div className="bg-red-50 p-4 rounded-xl">
                  <label className="block font-bold text-gray-800 mb-2">🎥 YouTube Video URL (optional)</label>
                  <input
                    value={content.event.videoUrl}
                    onChange={(e) => handleContentEdit('event', 'videoUrl', e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full border-2 border-blue-300 rounded px-3 py-2"
                  />
                  <p className="text-sm text-gray-600 mt-2">Paste YouTube video URL to show below</p>
                </div>
              ) : content.event.videoUrl && (
                <div className="aspect-video rounded-xl overflow-hidden shadow-2xl">
                  <iframe
                    src={`https://www.youtube.com/embed/${content.event.videoUrl.includes('youtu.be') ? content.event.videoUrl.split('youtu.be/')[1]?.split('?')[0] : content.event.videoUrl.split('v=')[1]?.split('&')[0]}?autoplay=1&mute=1`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Event Video"
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Join Online Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white rounded-3xl shadow-2xl p-8">
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
        <div className="mt-12 bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-800 text-white rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-6">
            <Heart size={56} className="mx-auto mb-4 animate-pulse" />
            <h3 className="text-3xl md:text-4xl font-bold mb-3">Support Our Orphanage Program</h3>
            <p className="text-xl">Making a difference in Ghana 🇬🇭</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-2xl p-8 shadow-lg">
            <h4 className="font-bold text-xl mb-6 text-center">💝 Donation Contacts</h4>
            <div className="space-y-4 text-lg">
              <a href={`https://wa.me/${content.contacts.donationContact1.match(/\d+/g).join('')}`} target="_blank" rel="noopener noreferrer" className="bg-white/20 backdrop-blur p-4 rounded-lg block hover:bg-white/30 transition cursor-pointer">
                <p className="font-semibold">📞 WhatsApp: {content.contacts.donationContact1}</p>
              </a>
              <a href={`https://wa.me/${content.contacts.donationContact2.match(/\d+/g).join('')}`} target="_blank" rel="noopener noreferrer" className="bg-white/20 backdrop-blur p-4 rounded-lg block hover:bg-white/30 transition cursor-pointer">
                <p className="font-semibold">📞 WhatsApp: {content.contacts.donationContact2}</p>
              </a>
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

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-2xl shadow-xl p-8 border-l-8 border-red-600 relative hover:shadow-2xl transition-shadow">
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

          <div className="bg-white rounded-2xl shadow-xl p-8 border-l-8 border-purple-600 relative hover:shadow-2xl transition-shadow">
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

        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white rounded-2xl shadow-2xl p-10 text-center">
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
              className="bg-purple-600 text-white px-8 py-3 rounded-xl hover:bg-purple-700 flex items-center gap-2 mx-auto shadow-lg hover:shadow-xl transition-all"
            >
              <Plus size={24} />
              <span className="font-semibold">Add Media (Image/Video/Audio)</span>
            </button>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.gallery.map((item) => (
            <div key={item.id} className="relative group">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all hover:scale-105">
                <div className="relative overflow-hidden h-64">
                  {item.type === 'video' ? (
                    <video
                      src={item.url}
                      controls
                      className="w-full h-full object-cover"
                    />
                  ) : item.type === 'audio' ? (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-100">
                      <div className="text-center p-4">
                        <MessageCircle size={64} className="mx-auto mb-4 text-purple-600" />
                        <audio
                          src={item.url}
                          controls
                          className="w-full"
                        />
                      </div>
                    </div>
                  ) : (
                    <img
                      src={item.url}
                      alt={item.caption}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  )}
                </div>
                <div className="p-5">
                  <p className="text-center font-bold text-gray-800 text-lg">{item.caption}</p>
                </div>
              </div>
              {isAdmin && (
                <button
                  onClick={() => deleteGalleryImage(item.id)}
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
          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Get In Touch</h2>
            <div className="space-y-5">
              <div className="flex items-start gap-4 p-5 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                <Phone className="text-blue-600 mt-1 flex-shrink-0" size={28} />
                <div className="flex-1">
                  <p className="font-bold text-gray-800 text-lg mb-3">📱 WhatsApp Contacts</p>
                  <a href={`https://wa.me/${content.contacts.phone1.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="block text-blue-600 font-semibold hover:underline mb-2">
                    Prophet: {content.contacts.phone1}
                  </a>
                  <a href={`https://wa.me/${content.contacts.phone2.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="block text-purple-600 font-semibold hover:underline">
                    Prophetess: {content.contacts.phone2}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors">
                <Mail className="text-purple-600 mt-1 flex-shrink-0" size={28} />
                <div>
                  <p className="font-bold text-gray-800 text-lg mb-2">🌐 Follow Us</p>
                  <p className="text-gray-700">Connect with us on all social media platforms</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-600 via-purple-600 to-indigo-700 text-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
            <p className="text-lg mb-8 leading-relaxed">
              Become part of a global family united in prayer, love, and restoration. 
              Together, we leave no one behind.
            </p>
            <div className="space-y-4">
              <button className="w-full bg-white text-purple-700 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition shadow-lg">
                🙏 Join Prayer Group
              </button>
              <button className="w-full bg-purple-800 text-white py-4 rounded-xl font-bold text-lg hover:bg-purple-900 transition shadow-lg">
                🤝 Partner With Us
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow">
          <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            � Support Our Orphanage Program in Ghana
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <a href={`https://wa.me/${content.contacts.donationContact1.match(/\d+/g).join('')}`} target="_blank" rel="noopener noreferrer" className="bg-gradient-to-br from-purple-100 to-purple-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer">
              <h4 className="font-bold text-gray-800 mb-3 text-xl">Contact Person 1</h4>
              <p className="text-purple-700 text-lg font-semibold">📞 WhatsApp: {content.contacts.donationContact1}</p>
            </a>
            <a href={`https://wa.me/${content.contacts.donationContact2.match(/\d+/g).join('')}`} target="_blank" rel="noopener noreferrer" className="bg-gradient-to-br from-purple-100 to-purple-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer">
              <h4 className="font-bold text-gray-800 mb-3 text-xl">Contact Person 2</h4>
              <p className="text-purple-700 text-lg font-semibold">📞 WhatsApp: {content.contacts.donationContact2}</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  const AdminLoginModal = () => (
    showAdminLogin && (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">🔐 Admin Login</h2>
          <input
            type="password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            placeholder="Enter admin password"
            className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 mb-6 text-lg focus:border-blue-500 focus:outline-none"
            onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
          />
          <div className="flex gap-4">
            <button
              onClick={handleAdminLogin}
              className="flex-1 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 font-semibold shadow-lg transition"
            >
              Login
            </button>
            <button
              onClick={() => {
                setShowAdminLogin(false);
                setAdminPassword('');
              }}
              className="flex-1 bg-gray-300 text-gray-800 py-3 rounded-xl hover:bg-gray-400 font-semibold shadow-lg transition"
            >
              Cancel
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-6 text-center bg-gray-50 p-3 rounded-lg">
            Default password: <span className="font-mono font-bold">ADMIN2026</span>
          </p>
        </div>
      </div>
    )
  );

  const ChatbotModal = () => (
    showChatbot && (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
        <div className="bg-white rounded-2xl w-full max-w-3xl h-[80vh] shadow-2xl flex flex-col">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-t-2xl flex items-center justify-between">
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

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'about' && <AboutPage />}
      {currentPage === 'gallery' && <GalleryPage />}
      {currentPage === 'contact' && <ContactPage />}
      <AdminLoginModal />
      <ChatbotModal />
      
      {/* Floating Chatbot Button */}
      <button
        onClick={() => setShowChatbot(true)}
        className="fixed bottom-24 right-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 rounded-full shadow-2xl hover:shadow-purple-500/50 hover:scale-110 transition-all z-40 group"
        title="Chat with our counselor"
      >
        <MessageCircle size={32} className="group-hover:rotate-12 transition-transform" />
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
          💬
        </span>
      </button>
      
      {isAdmin && (
        <>
          <button
            onClick={saveContent}
            className="fixed bottom-20 right-4 bg-purple-500 text-white px-6 py-3 rounded-full shadow-xl font-bold hover:bg-purple-600 transition flex items-center gap-2"
          >
            <Save size={20} /> Save All Changes
          </button>
          <div className="fixed bottom-4 right-4 bg-yellow-500 text-white px-6 py-3 rounded-full shadow-xl font-bold animate-pulse">
            ✓ Admin Mode Active
          </div>
        </>
      )}

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Heart className="text-red-500" size={32} />
              <h3 className="text-2xl font-bold">Arena of Prayer International Ministry</h3>
            </div>
            <p className="text-xl text-gray-300 font-semibold mb-2">We Leave No One Behind</p>
            <p className="text-gray-400">Prayer • Love • Restoration</p>
          </div>
          
          <div className="border-t border-gray-700 pt-6 text-center">
            <p className="text-sm text-gray-400">
              © 2026 APIM. All rights reserved. Built by Famyank.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default APIMWebsite;