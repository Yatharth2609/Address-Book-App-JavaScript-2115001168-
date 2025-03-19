class Contact {
    constructor(firstName, lastName, address, city, state, zip, phone, email) {
        // Validate input fields using regex
        this.validateName(firstName, "First Name");
        this.validateName(lastName, "Last Name");
        this.validateAddressField(address, "Address");
        this.validateAddressField(city, "City");
        this.validateAddressField(state, "State");
        this.validateZip(zip);
        this.validatePhone(phone);
        this.validateEmail(email);

        // Assigning values if all validations passes
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

     // Starts with uppercase, min 3 chars
    validateName(name, fieldName) {
        const nameRegex = /^[A-Z][a-zA-Z]{2,}$/; 
        if (!nameRegex.test(name)) {
            throw new Error(`${fieldName} should start with a capital letter and have at least 3 characters.`);
        }
    }

    // Minimun 4 Characters
    validateAddressField(field, fieldName) {
        if (field.length < 4) {
            throw new Error(`${fieldName} should have at least 4 characters.`);
        }
    }

    // IN ZIP format (5 digits or 5+4)
    validateZip(zip) {
        const zipRegex = /^\d{5}(-\d{4})?$/;  
        if (!zipRegex.test(zip)) {
            throw new Error("Invalid ZIP code. It should be 5 digits or in the format 12345-6789.");
        }
    }

    // Exactly 10-digit number
    validatePhone(phone) {
        const phoneRegex = /^\d{10}$/;  
        if (!phoneRegex.test(phone)) {
            throw new Error("Invalid Phone Number. It should be exactly 10 digits.");
        }
    }

    // Basic email format
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  
        if (!emailRegex.test(email)) {
            throw new Error("Invalid Email format.");
        }
    }
}


class AddressBook {
    constructor() {
        this.contacts = [];
    }

    // Add a contact with duplicate check
    addContact(contact) {
        if (!(contact instanceof Contact)) {
            throw new Error("Invalid contact object.");
        }

        // Checking for duplicate using filter method
        const isDuplicate = this.contacts
            .filter(existingContact => existingContact.getFullName() === contact.getFullName())
            .length > 0;

        if (isDuplicate) {
            throw new Error(`Contact with name ${contact.getFullName()} already exists.`);
        }

        this.contacts.push(contact);
        console.log(`Contact added: ${contact.getFullName()}`);
    }

    // Find contact by full name
    findContactByName(firstName, lastName) {
        return this.contacts.find(contact => 
            contact.firstName.toLowerCase() === firstName.toLowerCase() &&
            contact.lastName.toLowerCase() === lastName.toLowerCase()
        );
    }

    // Edit existing contact details
    editContact(firstName, lastName, newDetails) {
        const contact = this.findContactByName(firstName, lastName);
        if (!contact) {
            throw new Error(`Contact ${firstName} ${lastName} not found.`);
        }

        // Updating only the provided fields
        Object.keys(newDetails).forEach(field => {
            if (contact.hasOwnProperty(field)) {
                contact[field] = newDetails[field];
            }
        });

        console.log(`Contact updated: ${contact.getFullName()}`);
    }

    // Remove a contact by name
    removeContact(name) {
        const initialLength = this.contacts.length;
        this.contacts = this.contacts.filter(contact => contact.name !== name);
        if (this.contacts.length === initialLength) {
            throw new Error("Contact not found.");
        }
        console.log(`Contact with Name ${name} removed.`);
    }

    // Get the total number of contacts using reduce
    getContactCount() {
        return this.contacts.reduce(count => count + 1, 0);
    }

    //Search contacts by either City or State.
    searchByLocation(location) {
        return this.contacts.filter(contact => 
            contact.city.toLowerCase() === location.toLowerCase() ||
            contact.state.toLowerCase() === location.toLowerCase()
        );
    }


    //View contacts in a given City or State with formatted details.
    viewContactsByLocation(location) {
        return this.searchByLocation(location).map(contact => ({
            Name: contact.getFullName(),
            Address: contact.address,
            Phone: contact.phone,
            Email: contact.email
        }));
    }
    
    // Get the count of contacts in a given City or State.
    getContactCountByLocation(location) {
        return this.contacts
            .filter(contact => 
                contact.city.toLowerCase() === location.toLowerCase() || 
                contact.state.toLowerCase() === location.toLowerCase()
            )
            .reduce(count => count + 1, 0);
    }
}
