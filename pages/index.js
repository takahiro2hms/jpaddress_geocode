import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import xml2js from 'xml-js';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-regular-svg-icons';

const DynamicMap = dynamic(
  () => import('../components/MapComponent'),
  { ssr: false }
);

const Home = () => {
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState(null);

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const fetchGeocode = async () => {
    try {
      const response = await axios.get(`https://geocode.csis.u-tokyo.ac.jp/cgi-bin/simple_geocode.cgi?addr=${address}`);
      const result = xml2js.xml2js(response.data, { compact: true });
      const latitude = parseFloat(result.results.candidate.latitude._text);
      const longitude = parseFloat(result.results.candidate.longitude._text);
      setLocation({ lat: latitude, lng: longitude });
    } catch (error) {
      console.error("Error fetching geocode:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
        fetchGeocode();
    }
  };

  const copyToClipboard = (text) => {
    const textarea = document.createElement('textarea');
    textarea.textContent = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  };

  return (
    <div className="container">
        <Header />
        
        <div className="input-wrapper">
            <input
                type="text"
                value={address}
                onChange={handleAddressChange}
                onKeyPress={handleKeyPress}
                placeholder="住所を入力してください"
            />
            <button onClick={fetchGeocode}>表示</button>
        </div>

        {location && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ fontWeight: 'bold', marginRight: '10px' }}>
                    緯度: {location.lat}, 経度: {location.lng}
                </p>
                {/* クリップボードにコピーするボタンを追加 */}
                <button 
                    onClick={() => copyToClipboard(`${location.lat}, ${location.lng}`)}
                    style={{ background: 'none', border: 'none', padding: '0' }}
                >
                    <FontAwesomeIcon icon={faCopy} size="lg" color="#4a4a4a" />
                </button>
            </div>
            <DynamicMap location={location} />
          </div>
        )}

        <p style={{ marginTop: '20px', textAlign: 'center' }}>
            <a href="https://geocode.csis.u-tokyo.ac.jp/" target="_blank" rel="noopener noreferrer">
                CSISシンプルジオコーディング実験を利用
            </a>
        </p>

        <Footer />
    </div>
  );
};

export default Home;
