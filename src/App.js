import React, { useState, useEffect } from 'react';
//import CourseInput from './components/CourseGoals/CourseInput'; // Importti CourseInput-komponentille
//import CourseGoalList from './components/CourseGoals/CourseGoalList'; // Importti CourseGoalList-komponentille

const App = () => {
  const [consultants, setConsultants] = useState([]);
  const [filteredConsultants, setFilteredConsultants] = useState([]);

  useEffect(() => {
    // Simuloitu API-kutsu
    const fetchConsultants = async () => {
      const data = [
        { id: 1, name: 'John Doe', education: 'M.Sc', certifications: 'AWS', experienceYears: 5 },
        { id: 2, name: 'Jane Smith', education: 'B.Sc', certifications: 'PMP', experienceYears: 8 },
      ];
      setConsultants(data);
      setFilteredConsultants(data);
    };

    fetchConsultants();
  }, []);

  const handleSearch = (query) => {
    const results = consultants.filter((c) =>
      c.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredConsultants(results);
  };

  const handleAddConsultant = (newConsultant) => {
    const updatedConsultants = [
      ...consultants,
      { ...newConsultant, id: consultants.length + 1 },
    ];
    setConsultants(updatedConsultants);
    setFilteredConsultants(updatedConsultants);
  };

  const handleViewDetails = (id) => {
    const consultant = consultants.find((c) => c.id === id);
    alert(
      `Name: ${consultant.name}\nEducation: ${consultant.education}\nCertifications: ${consultant.certifications}\nExperience: ${consultant.experienceYears} years`
    );
  };

  return (
    <div>
      <h1>Consultant Manager</h1>
       
    </div>
  );
};

export default App;
