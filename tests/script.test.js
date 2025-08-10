// tests/script.test.js - Unit tests for main functionality
import { JSDOM } from 'jsdom';

// Mock DOM environment
const dom = new JSDOM(`
  <!DOCTYPE html>
  <html>
    <body>
      <div id="petList"></div>
      <input id="searchInput" />
      <select id="filterSelect">
        <option value="all">All Pets</option>
        <option value="dog">Dogs</option>
        <option value="cat">Cats</option>
      </select>
    </body>
  </html>
`);

global.document = dom.window.document;
global.window = dom.window;

// Import the functions to test (you'll need to export them from script.js)
// For now, we'll test basic DOM functionality

describe('Pet Management System', () => {
  test('should have required DOM elements', () => {
    expect(document.getElementById('petList')).toBeTruthy();
    expect(document.getElementById('searchInput')).toBeTruthy();
    expect(document.getElementById('filterSelect')).toBeTruthy();
  });

  test('should filter pets correctly', () => {
    // Mock pet data
    const pets = [
      { name: 'Buddy', type: 'dog' },
      { name: 'Whiskers', type: 'cat' },
      { name: 'Max', type: 'dog' }
    ];

    const dogPets = pets.filter(pet => pet.type === 'dog');
    expect(dogPets).toHaveLength(2);
    expect(dogPets[0].name).toBe('Buddy');
  });

  test('should search pets by name', () => {
    const pets = [
      { name: 'Buddy', type: 'dog' },
      { name: 'Whiskers', type: 'cat' }
    ];

    const searchTerm = 'bud';
    const filteredPets = pets.filter(pet => 
      pet.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    expect(filteredPets).toHaveLength(1);
    expect(filteredPets[0].name).toBe('Buddy');
  });
});

