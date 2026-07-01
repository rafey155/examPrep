import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router';

const Dashboard = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const role = localStorage.getItem('role');

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (role !== 'admin') {
      window.location.href = '/adlogin';
    }
  }, [role]);

  const isMobile = windowWidth < 768;
  const email = localStorage.getItem('email');

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    else if (hour < 17) return 'Good Afternoon';
    else return 'Good Evening';
  };

  const styles = {
    container: {
      display: 'flex',
      height: '100vh',
      fontFamily: 'Segoe UI, Inter, sans-serif',
      background: '#f3e9ff',
      position: 'relative',
      overflow: 'hidden',
    },
    sidebar: {
      width: '240px',
      position: isMobile ? 'fixed' : 'relative',
      top: 0,
      left: isMobile ? (mobileMenuOpen ? '0' : '-240px') : '0',
      height: '100vh',
      zIndex: 1100,
      background: 'linear-gradient(to bottom right, #4a00e0, #8e2de2)', // Rich purple gradient
      color: '#fff',
      padding: '24px 18px',
      transition: 'left 0.3s ease-in-out',
      borderTopRightRadius: isMobile ? '0px' : '24px',
      borderBottomRightRadius: isMobile ? '0px' : '24px',
      boxShadow: '5px 0 20px rgba(0,0,0,0.25)',
      fontSize: '18px',
      fontWeight: '500',
      display: 'flex',
      flexDirection: 'column',
    },
    sidebarHeader: {
      fontSize: '23px',
      fontWeight: '700',
      marginBottom: '24px',
      color: '#ffffff',
      letterSpacing: '1px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    navLinks: {
      listStyle: 'none',
      padding: 0,
      marginTop: '10px',
      flex: 1,
    },
    navItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '10px 12px',
      marginBottom: '10px',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'background 0.3s, transform 0.2s',
    },
    link: {
      color: '#ffffff',
      textDecoration: 'none',
      flex: 1,
      transition: 'color 0.3s',
    },
    navItemHover: {
      background: 'rgba(255, 255, 255, 0.15)',
      transform: 'scale(1.02)',
    },
    main: {
      flex: 1,
      padding: isMobile ? '16px' : '40px',
      backgroundColor: '#f3e9ff', // Light lavender background
      overflow: 'auto',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      backgroundColor: '#ffffff',
      padding: isMobile ? '16px' : '30px',
      borderRadius: '20px',
      boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
      minHeight: 'calc(100vh - 150px)',
    },
  };

  return (
    <div style={styles.container}>
      {/* Mobile Overlay */}
      {isMobile && mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(2px)',
            zIndex: 1050,
          }}
        />
      )}

      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <span>Exam Prep</span>
          {isMobile && (
            <button 
              onClick={() => setMobileMenuOpen(false)}
              style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '4px' }}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          )}
        </div>
        <ul style={styles.navLinks}>
          <li style={styles.navItem} onClick={() => isMobile && setMobileMenuOpen(false)}>
            <i className="fa-solid fa-chart-bar"></i>
            <Link to="/admin/session" style={styles.link}>Session</Link>
          </li>
          <li style={styles.navItem} onClick={() => isMobile && setMobileMenuOpen(false)}>
            <i className="fa-solid fa-book-open"></i>
            <Link to="/admin/subject" style={styles.link}>Subject</Link>
          </li>
          <li style={styles.navItem} onClick={() => isMobile && setMobileMenuOpen(false)}>
            <i className="fa-solid fa-user"></i>
            <Link to="/admin/examinee" style={styles.link}>Examinee</Link>
          </li>
          <li style={styles.navItem} onClick={() => isMobile && setMobileMenuOpen(false)}>
            <i className="fa-solid fa-database"></i>
            <Link to="/admin/questionbank" style={styles.link}>Question Bank</Link>
          </li>
          <li style={styles.navItem} onClick={() => isMobile && setMobileMenuOpen(false)}>
            <i className="fa-solid fa-pencil"></i>
            <Link to="/admin/examination" style={styles.link}>Examination</Link>
          </li>
          <li style={styles.navItem} onClick={() => isMobile && setMobileMenuOpen(false)}>
            <i className="fa-solid fa-award"></i>
            <Link to="/admin/report" style={styles.link}>Report Generation</Link>
          </li>
          <li style={styles.navItem} onClick={() => isMobile && setMobileMenuOpen(false)}>
            <i className="fa-solid fa-check-double"></i>
            <Link to={"/admin/resultdec"} style={styles.link}>Result Declaration</Link>
          </li>
          <li style={styles.navItem} onClick={() => isMobile && setMobileMenuOpen(false)}>
            <i className="fa-solid fa-headset"></i>
            <Link to="/admin/contact" style={styles.link}>Contact Us</Link>
          </li>
          <li style={styles.navItem} onClick={() => isMobile && setMobileMenuOpen(false)}>
            <i className="fa-solid fa-key"></i>
            <Link to="/admin/password" style={styles.link}>Change Password</Link>
          </li>
          <li style={styles.navItem} onClick={() => isMobile && setMobileMenuOpen(false)}>
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            <Link
              to="#"
              style={styles.link}
              onClick={() => {
                localStorage.removeItem('role');
                localStorage.removeItem('email');
                window.location.href = '/adlogin';
              }}
            >
              Log Out
            </Link>
          </li>
        </ul>
      </div>

      {/* Main */}
      <div style={styles.main}>
        {/* Topbar */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: isMobile ? 'flex-start' : 'center',
          marginBottom: '20px',
          gap: '12px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
            {isMobile && (
              <button
                onClick={() => setMobileMenuOpen(true)}
                style={{
                  background: 'linear-gradient(to right, #4a00e0, #8e2de2)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 10px rgba(110,0,255,0.3)',
                }}
              >
                <i className="fa-solid fa-bars" style={{ fontSize: '18px' }}></i>
              </button>
            )}
            <h4 style={{ 
              fontSize: isMobile ? '24px' : '35px', 
              fontWeight: '700', 
              color: '#6e00ff', 
              margin: 0,
              flex: 1
            }}>
              {getGreeting()}, Admin
            </h4>
          </div>
          
          <h2 style={{ 
            fontSize: isMobile ? '20px' : '30px', 
            fontWeight: '600', 
            color: '#4a00e0', 
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            Admin Dashboard <i className="fa-solid fa-chart-line ms-2"></i>
          </h2>
        </div>

        <div style={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
