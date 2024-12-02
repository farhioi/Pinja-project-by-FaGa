import React, { useState, useEffect } from 'react';
import { jsPDF } from "jspdf"; // PDF-tulostus
import './App.css'; // Tyylitiedosto

const App = () => {
  const [consultants, setConsultants] = useState([]); // Konsulttien tiedot
  const [filteredConsultants, setFilteredConsultants] = useState([]); // Suodatetut konsultit
  const [newConsultant, setNewConsultant] = useState({
    id: '',
    name: '',
    education: '',
    certifications: '',
    experienceYears: '',
    technologyExperience: '',
    startYear: '',
  });

  const [searchQuery, setSearchQuery] = useState(""); // Hakuparametri

  // Simuloitu API-kutsu, joka tuo esimerkkikonsultteja
  useEffect(() => {
    const fetchConsultants = async () => {
      const data = [
        {
          id: 1,
          name: "Farhio Ibrahim",
          education: "Tietojenkäsittely",
          certifications: "AWS Certified",
          experienceYears: 5,
          technologyExperience: "React, Node.js",
          startYear: 2018,
        },
        {
          id: 2,
          name: "Gabriela Doykova",
          education: "Tietojenkäsittely",
          certifications: "PMP",
          experienceYears: 8,
          technologyExperience: "Java, Spring Boot",
          startYear: 2015,
        },
      ];
      setConsultants(data);
      setFilteredConsultants(data); // Aluksi kaikki konsultit näytetään
    };

    fetchConsultants();
  }, []);

  // Konsulttien hakeminen suodatettujen tietojen perusteella
  const handleSearch = () => {
    const results = consultants.filter(
      (c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.technologyExperience.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.certifications.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.experienceYears.toString().includes(searchQuery)
    );
    setFilteredConsultants(results);
  };

  // Konsultin tietojen muokkaaminen
  const handleUpdateConsultant = (updatedConsultant) => {
    const updatedConsultants = consultants.map((consultant) =>
      consultant.id === updatedConsultant.id ? updatedConsultant : consultant
    );
    setConsultants(updatedConsultants);
    setFilteredConsultants(updatedConsultants);
  };

  // Konsultin tietojen poistaminen
  const handleRemoveConsultant = (id) => {
    const updatedConsultants = consultants.filter((consultant) => consultant.id !== id);
    setConsultants(updatedConsultants);
    setFilteredConsultants(updatedConsultants);
  };

  // Konsultin CV:n tulostaminen
  const handleGenerateCV = (consultant) => {
    const doc = new jsPDF();
    doc.text(`CV - ${consultant.name}`, 10, 10);
    doc.text(`Koulutus: ${consultant.education}`, 10, 20);
    doc.text(`Sertifikaatit: ${consultant.certifications}`, 10, 30);
    doc.text(`Työkokemus: ${consultant.experienceYears} vuotta`, 10, 40);
    doc.text(`Teknologiat ja kokemus: ${consultant.technologyExperience}`, 10, 50);
    doc.text(`Aloitusvuosi: ${consultant.startYear}`, 10, 60);
    doc.save(`${consultant.name}_CV.pdf`);
  };

  // Useamman konsultin CV:n tulostaminen
  const handleGenerateTeamCVs = () => {
    const doc = new jsPDF();
    filteredConsultants.forEach((consultant, index) => {
      doc.text(`Konsultti ${index + 1}: ${consultant.name}`, 10, 10 + index * 30);
      doc.text(`Koulutus: ${consultant.education}`, 10, 20 + index * 30);
      doc.text(`Sertifikaatit: ${consultant.certifications}`, 10, 30 + index * 30);
      doc.text(`Työkokemus: ${consultant.experienceYears} vuotta`, 10, 40 + index * 30);
      doc.text(`Teknologiat ja kokemus: ${consultant.technologyExperience}`, 10, 50 + index * 30);
      doc.text(`Aloitusvuosi: ${consultant.startYear}`, 10, 60 + index * 30);
    });
    doc.save("Tiimi_CVs.pdf");
  };

  return (
    <div>
      {/* Yläbanneri */}
      <header className="header-banner">
        PINJA
      </header>

      {/* Pääsisältö */}
      <div className="content-container">
        <h1>Konsulttien Hallinta</h1>

        {/* Haku */}
        <div className="search-section">
          <h3>Etsi Konsultteja</h3>
          <input
            type="text"
            placeholder="Etsi nimen, teknologian tai sertifikaatin perusteella"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Etsi</button>
        </div>

        {/* Uuden konsultin lisääminen */}
        <div className="add-consultant-section">
          <h3>Lisää Uusi Konsultti</h3>
          <input
            type="text"
            placeholder="Nimi"
            value={newConsultant.name}
            onChange={(e) => setNewConsultant({ ...newConsultant, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Koulutus"
            value={newConsultant.education}
            onChange={(e) => setNewConsultant({ ...newConsultant, education: e.target.value })}
          />
          <input
            type="text"
            placeholder="Sertifikaatit"
            value={newConsultant.certifications}
            onChange={(e) => setNewConsultant({ ...newConsultant, certifications: e.target.value })}
          />
          <input
            type="number"
            placeholder="Työkokemus (vuosia)"
            value={newConsultant.experienceYears}
            onChange={(e) => setNewConsultant({ ...newConsultant, experienceYears: e.target.value })}
          />
          <input
            type="text"
            placeholder="Teknologiat ja kokemus"
            value={newConsultant.technologyExperience}
            onChange={(e) => setNewConsultant({ ...newConsultant, technologyExperience: e.target.value })}
          />
          <input
            type="number"
            placeholder="Aloitusvuosi"
            value={newConsultant.startYear}
            onChange={(e) => setNewConsultant({ ...newConsultant, startYear: e.target.value })}
          />
          <button onClick={handleUpdateConsultant}>Lisää Konsultti</button>
        </div>

        {/* Konsulttien lista */}
        <div className="consultants-list">
          <h3>Konsultit</h3>
          <ul>
            {filteredConsultants.map((consultant) => (
              <li key={consultant.id}>
                <strong>{consultant.name}</strong><br />
                {consultant.education} | {consultant.certifications} | {consultant.experienceYears} vuotta kokemusta<br />
                <button onClick={() => handleGenerateCV(consultant)}>Tulosta CV</button>
                <button onClick={() => handleRemoveConsultant(consultant.id)}>Poista</button>
              </li>
            ))}
          </ul>
        </div>

        {/* Useamman CV:n tulostus */}
        <div>
          <h3>Tulosta Tiimi</h3>
          <button onClick={handleGenerateTeamCVs}>Tulosta Useiden CV:t</button>
        </div>
      </div>
    </div>
  );
};

export default App;
