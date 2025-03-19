class Contact {
    constructor(firstName, lastName, address, city, state, zip, phone, email) {
        if (!firstName || !lastName || !phone || !email) {
            throw new Error("First Name, Last Name, Phone, and Email are required.");
        }
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.phone = phone;
        this.email = email;
    }

    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}

class AddressBook {
    constructor() {
        this.contacts = [];
    }

    // Add a contact
    addContact(contact) {
        if (!(contact instanceof Contact)) {
            throw new Error("Invalid contact object.");
        }
        this.contacts.push(contact);
        console.log(`Contact added: ${contact.getFullName()}`);
    }

    // Remove a contact by email
    removeContact(email) {
        const initialLength = this.contacts.length;
        this.contacts = this.contacts.filter(contact => contact.email !== email);
        if (this.contacts.length === initialLength) {
            throw new Error("Contact not found.");
        }
        console.log(`Contact with email ${email} removed.`);
    }

    // Find a contact by name
    findContactsByName(name) {
        return this.contacts.filter(contact => 
            contact.firstName.toLowerCase().includes(name.toLowerCase()) ||
            contact.lastName.toLowerCase().includes(name.toLowerCase())
        );
    }

    // List all contacts
    listContacts() {
        return this.contacts.map(contact => ({
            Name: contact.getFullName(),
            Phone: contact.phone,
            Email: contact.email
        }));
    }

    // Count total contacts
    countContacts() {
        return this.contacts.reduce((count) => count + 1, 0);
    }
}
