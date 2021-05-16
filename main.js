let contacts = []

function addContact(event) {
  event.preventDefault()
  let form = event.target

  let contact = {
    id: generateId(),
    name: form.name.value,
    phone: form.phone.value,
    emergencyContact: form.emergencyContact.checked
  }
  contacts.push(contact)
  console.log(contacts)
  saveContacts()
  form.reset()

}

function saveContacts() {
  window.localStorage.setItem(
    "contacts", JSON.stringify(contacts))
  drawContacts()
}
function loadContacts() {
  let contactsData = JSON.parse(
    window.localStorage.getItem("contacts"))
  if (contactsData) {
    contacts = contactsData
  }
}
function drawContacts() {
  let contactListElement = document.getElementById("contact-list")
  let template = ""
  contacts.forEach(contact => {
    template += `
    <div class="contact-card mt-1 mb-1 ${contact.emergencyContact ? 'emergency-contact' : ''}" >
        <h3 class="mt-1 mb-1">${contact.name}</h3>
        <div class="d-flex space-between">
          <p>
            <i class="fa fa-fw fa-phone"></i>
          <span>${contact.phone}</span>
          </p>
        <i class="action fa fa-trash text-danger" onclick="removeContact('${contact.id}')"></i>
        </div>
      </div >
    `
  })
  contactListElement.innerHTML = template

}

function removeContact(contactId) {
  let index = contacts.findIndex(contact => contact.id == contactId)
  //if can't find index, returns index of -1
  if (index == -1) {
    throw new Error("Contact ID invalid")
  }
  contacts.splice(index, 1)
  saveContacts()
}

/**
 * Toggles the visibility of the AddContact Form
 */
function toggleAddContactForm() {
  let contactsElem = document.getElementById("new-contact-form")
  contactsElem.classList.toggle("hidden")

}


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}


loadContacts()
drawContacts()