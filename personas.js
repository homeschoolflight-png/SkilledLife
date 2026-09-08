// Five rotating fictional personas used for drag-and-drop extraction tasks.
// Persona 5 ("messy") intentionally includes extra, irrelevant details mixed
// in with the real fields, to practice filtering out noise.

function formatPhone(areaCode, prefix, line) {
  return `(${areaCode}) ${prefix}-${line}`;
}

const PERSONAS = [
  {
    id: "jordan",
    name: "Jordan Kim",
    gender: "Female",
    houseNumber: "42",
    street: "Birch Lane",
    city: "Denver",
    county: "Denver County",
    region: "West",
    state: "CO",
    zip: "80203",
    areaCode: "303",
    prefix: "555",
    line: "0199",
    email: "jordan.kim@mailbox.com",
    placeOfBirth: "Denver, CO",
    availability: "Weekdays after 3pm and all day Saturday",
    position: "Pet store cashier",
    experience: "Walked dogs for neighbors for 2 years",
    dob: "2010-04-12",
    emergencyContactName: "Pat Kim",
    emergencyContactRelationship: "Mother",
    emergencyContactPhone: "(303) 555-0140",
    insuranceProvider: "Rocky Mountain Health Plan",
    insurancePolicy: "RMH-88213",
    reasonForVisit: "Follow-up on a twisted ankle",
    allergies: "None",
    messy: false
  },
  {
    id: "sam",
    name: "Sam Ortega",
    gender: "Male",
    houseNumber: "907",
    street: "Larkspur Ave",
    city: "Austin",
    county: "Travis County",
    region: "Southwest",
    state: "TX",
    zip: "78745",
    areaCode: "512",
    prefix: "555",
    line: "0341",
    email: "samortega14@mailbox.com",
    placeOfBirth: "Austin, TX",
    availability: "Tuesday, Thursday, and weekend mornings",
    position: "Grocery store bagger",
    experience: "Volunteered at a food pantry for one summer",
    dob: "2009-11-02",
    emergencyContactName: "Elena Ortega",
    emergencyContactRelationship: "Mother",
    emergencyContactPhone: "(512) 555-0322",
    insuranceProvider: "TexHealth",
    insurancePolicy: "TX-55210",
    reasonForVisit: "Annual check-up",
    allergies: "Penicillin",
    messy: false
  },
  {
    id: "riley",
    name: "Riley Bennett",
    gender: "Female",
    houseNumber: "18",
    street: "Fawn Court",
    city: "Madison",
    county: "Dane County",
    region: "Midwest",
    state: "WI",
    zip: "53703",
    areaCode: "608",
    prefix: "555",
    line: "0287",
    email: "riley.bennett@mailbox.com",
    placeOfBirth: "Madison, WI",
    availability: "Weekday afternoons",
    position: "Library shelver",
    experience: "None yet — first job",
    dob: "2011-01-27",
    emergencyContactName: "Marcus Bennett",
    emergencyContactRelationship: "Father",
    emergencyContactPhone: "(608) 555-0119",
    insuranceProvider: "Badger Family Health",
    insurancePolicy: "BFH-30044",
    reasonForVisit: "Sore throat and mild fever",
    allergies: "Pollen (seasonal)",
    messy: false
  },
  {
    id: "casey",
    name: "Casey Nguyen",
    gender: "Male",
    houseNumber: "615",
    street: "Magnolia Street",
    city: "Charlotte",
    county: "Mecklenburg County",
    region: "Southeast",
    state: "NC",
    zip: "28202",
    areaCode: "704",
    prefix: "555",
    line: "0456",
    email: "casey.nguyen@mailbox.com",
    placeOfBirth: "Charlotte, NC",
    availability: "Saturdays only",
    position: "Movie theater usher",
    experience: "Helped run the sound booth at school plays",
    dob: "2010-08-19",
    emergencyContactName: "Linh Nguyen",
    emergencyContactRelationship: "Mother",
    emergencyContactPhone: "(704) 555-0198",
    insuranceProvider: "Carolina Care",
    insurancePolicy: "CC-77129",
    reasonForVisit: "Physical for sports team",
    allergies: "None",
    messy: false
  },
  {
    id: "morgan",
    name: "Morgan Alvarez",
    gender: "Female",
    houseNumber: "230",
    street: "Chestnut Way",
    city: "Portland",
    county: "Multnomah County",
    region: "West",
    state: "OR",
    zip: "97205",
    areaCode: "503",
    prefix: "555",
    line: "0672",
    email: "morgan.alvarez@mailbox.com",
    placeOfBirth: "Portland, OR",
    availability: "Weekend afternoons, and Wednesday evenings if needed",
    position: "Coffee shop counter help",
    experience: "Ran a lemonade stand two summers ago and helped a neighbor with their yard sale",
    dob: "2010-06-05",
    emergencyContactName: "David Alvarez",
    emergencyContactRelationship: "Father",
    emergencyContactPhone: "(503) 555-0087",
    insuranceProvider: "Pacific Northwest Health",
    insurancePolicy: "PNH-19087",
    reasonForVisit: "Rash on arm that has not gone away after a week, also mentioned she has been sleeping fine and eating normally",
    allergies: "Shellfish, and also does not like the smell of lavender",
    // Extra irrelevant details woven into this persona's bio on purpose:
    extraNoise: "has a dog named Biscuit, plays clarinet, favorite color is teal, mentioned she is saving up for a bike",
    messy: true
  }
];

function pickPersona() {
  return PERSONAS[Math.floor(Math.random() * PERSONAS.length)];
}

function jobApplicationBio(p) {
  let bio = `${p.name} lives at ${p.houseNumber} ${p.street}, ${p.city}, ${p.state} ${p.zip}. `;
  bio += `Phone: ${formatPhone(p.areaCode, p.prefix, p.line)}. Available: ${p.availability}. `;
  bio += `Applying for: ${p.position}. Previous experience: ${p.experience}. `;
  bio += `Gender: ${p.gender}. Place of birth: ${p.placeOfBirth}.`;
  if (p.messy) {
    bio += ` By the way, ${p.name.split(" ")[0]} ${p.extraNoise}.`;
  }
  return bio;
}

function medicalIntakeBio(p) {
  let bio = `${p.name}, born ${p.dob}, lives at ${p.houseNumber} ${p.street}, ${p.city}, ${p.state} ${p.zip}. `;
  bio += `Phone: ${formatPhone(p.areaCode, p.prefix, p.line)}. Email: ${p.email}. Gender: ${p.gender}. Place of birth: ${p.placeOfBirth}. `;
  bio += `Emergency contact: ${p.emergencyContactName} (${p.emergencyContactRelationship}), ${p.emergencyContactPhone}. `;
  bio += `Insurance: ${p.insuranceProvider}, policy ${p.insurancePolicy}. `;
  bio += `Reason for visit: ${p.reasonForVisit}. Allergies/medications: ${p.allergies}.`;
  if (p.messy) {
    bio += ` Also worth knowing: ${p.extraNoise}.`;
  }
  return bio;
}

function addressPhoneBio(p) {
  let bio = `${p.name}'s address is ${p.houseNumber} ${p.street}, ${p.city}, ${p.state} ${p.zip}. `;
  bio += `Their phone number is ${formatPhone(p.areaCode, p.prefix, p.line)}.`;
  if (p.messy) {
    bio += ` (${p.name.split(" ")[0]} ${p.extraNoise}.)`;
  }
  return bio;
}
