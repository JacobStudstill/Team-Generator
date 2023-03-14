const Intern = require('../lib/Intern');

// Creating intern object  
test('creates an Intern object', () => {
    const intern = new Intern('Jacob', 2, 'jacob.studstill@gmail.com', 'UCF');

    expect(intern.school).toEqual(expect.any(String));
});

// Gets school from getSchool()
test('gets employee school', () => {
    const intern = new Intern('Jacob', 2, 'jacob.studstill@gmail.com', 'UCF');

    expect(intern.getSchool()).toEqual(expect.stringContaining(intern.school.toString()));
});

// Gets role from getRole()
test('gets role of employee', () => {
    const intern = new Intern('Jacob', 2, 'jacob.studstill@gmail.com', 'UCF');

    expect(intern.getRole()).toEqual("Intern");
});