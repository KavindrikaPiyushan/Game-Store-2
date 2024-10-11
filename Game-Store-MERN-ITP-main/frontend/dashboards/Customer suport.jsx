import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../src/components/header";
import useAuthCheck from "../src/utils/authCheck";
import { Link } from "react-router-dom";
import {
  Tabs,
  Tab,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  Button,
  Input,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Textarea,
  Chip,
} from "@nextui-org/react";
import { Flip, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../src/components/footer";
import ChatModal from "../src/components/ChatModal";
import { Helmet } from "react-helmet-async";

const ContactDash = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [faqs, setFaqs] = useState([]);
  const [contactMessages, setContactMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [contact, setContact] = useState([]);

  //chat open
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState(null);

  const handleChatOpen = (contactId) => {
    setSelectedContactId(contactId);
    setIsChatOpen(true);
  };

  const statusColorMap = {
    open: "success",
    closed: "danger",
  };

  // FAQ state
  const {
    isOpen: isAddFAQOpen,
    onOpen: onAddFAQOpen,
    onOpenChange: onAddFAQOpenChange,
  } = useDisclosure();
  const {
    isOpen: isEditFAQOpen,
    onOpen: onEditFAQOpen,
    onOpenChange: onEditFAQOpenChange,
  } = useDisclosure();
  const [newFAQQuestion, setNewFAQQuestion] = useState("");
  const [newFAQAnswer, setNewFAQAnswer] = useState("");
  const [editingFAQ, setEditingFAQ] = useState(null);
  const [editFAQQuestion, setEditFAQQuestion] = useState("");
  const [editFAQAnswer, setEditFAQAnswer] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [faqResponse, contactResponse] = await Promise.all([
          axios.get("http://localhost:8098/faq/fetchFAQ"),
          axios.get("http://localhost:8098/contacts/fetchContacts"),
        ]);

        if (faqResponse.data && faqResponse.data.allFAQs) {
          setFaqs(faqResponse.data.allFAQs);
        } else {
          setFaqs([]);
        }

        if (contactResponse.data && contactResponse.data.allContacts) {
          setContactMessages(contactResponse.data.allContacts);
        } else {
          setContactMessages([]);
        }
      } catch (err) {
        setError("Failed to fetch data");
        setFaqs([]);
        setContactMessages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // FAQ functions
  const handleAddFAQ = async () => {
    // Check if either the question or answer fields are empty
    if (!newFAQQuestion.trim() || !newFAQAnswer.trim()) {
      // Show error toast when fields are empty
      toast.error("Both Question and Answer fields are required", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Flip,
        progressBarClassName: "bg-gray-800",
        style: { fontFamily: "Rubik" },
      });
      return; // Stop the submission if the fields are empty
    }

    try {
      const response = await axios.post("http://localhost:8098/faq/createFAQ", {
        question: newFAQQuestion,
        answer: newFAQAnswer,
      });

      console.log("Response:", response);

      if (
        response.status >= 200 &&
        response.status < 300 &&
        response.data.faq
      ) {
        setFaqs((prevFaqs) => [...prevFaqs, response.data.faq]);

        // Show success toast
        toast.success("FAQ added", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Flip,
          progressBarClassName: "bg-gray-800",
          style: { fontFamily: "Rubik" },
        });
      }

      // Clear input fields and close modal
      setNewFAQQuestion("");
      setNewFAQAnswer("");
      onAddFAQOpenChange(false);
    } catch (error) {
      console.error("Error adding FAQ:", error);
      setError("Failed to add FAQ");

      // Show error toast
      toast.error("Failed to add FAQ", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Flip,
        progressBarClassName: "bg-gray-800",
        style: { fontFamily: "Rubik" },
      });
    }
  };

  const handleUpdateFAQ = async () => {
    // Check if the current question and answer are different from the original
    if (
      editFAQQuestion.trim() === editingFAQ.question.trim() &&
      editFAQAnswer.trim() === editingFAQ.answer.trim()
    ) {
      // Show error toast when there are no changes
      toast.error("No changes detected", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Flip,
        progressBarClassName: "bg-gray-800",
        style: { fontFamily: "Rubik" },
      });
      return; // Stop submission if no changes are made
    }

    if (editFAQQuestion.trim() === "" || editFAQAnswer.trim() === "") {
      toast.error("Question and answer cannot be empty!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Flip,
        progressBarClassName: "bg-gray-800",
        style: { fontFamily: "Rubik" },
      });
      return;
    }
    try {
      const response = await axios.put(
        `http://localhost:8098/faq/updateFAQ/${editingFAQ._id}`,
        {
          question: editFAQQuestion,
          answer: editFAQAnswer,
        }
      );

      console.log("Response Data:", response.data);

      if (response.status >= 200 && response.status < 300) {
        console.log("Updated FAQ Data:", response.data);

        if (response.data.faq) {
          setFaqs((prevFaqs) =>
            prevFaqs.map((faq) =>
              faq._id === response.data.faq._id ? response.data.faq : faq
            )
          );

          // Show success toast after FAQ is updated
          toast.success("FAQ Updated", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Flip,
            progressBarClassName: "bg-gray-800",
            style: { fontFamily: "Rubik" },
          });
        }
      }

      // Clear the input fields and reset the editing state
      setEditFAQQuestion("");
      setEditFAQAnswer("");
      setEditingFAQ(null);
      onEditFAQOpenChange(false);
    } catch (error) {
      console.error("Error updating FAQ:", error);
      setError("Failed to update FAQ");

      // Show error toast in case of failure
      toast.error("Failed to update FAQ", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Flip,
        progressBarClassName: "bg-gray-800",
        style: { fontFamily: "Rubik" },
      });
    }
  };

  const handleUpdateStatus = async (contactId) => {
    try {
      setLoading(true);

      const response = await axios.put(
        `http://localhost:8098/contacts/setStatus/${contactId}`,
        {
          status: "closed",
        }
      );

      console.log(contactId);
      console.log("Response Data:", response.data);

      if (response.status >= 200 && response.status < 300) {
        console.log("Status updated to closed:", response.data);

        // Update the local state immediately
        setContact((prevContact) => ({
          ...prevContact,
          status: "closed",
        }));

        // Show success toast after the status is updated
        toast.success("Status updated to closed", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Flip,
          progressBarClassName: "bg-gray-800",
          style: { fontFamily: "Rubik" },
        });
      }
    } catch (error) {
      console.error("Error updating status:", error);
      setError("Failed to update status");

      // Show error toast in case of failure
      toast.error("Failed to update status", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Flip,
        progressBarClassName: "bg-gray-800",
        style: { fontFamily: "Rubik" },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFAQ = async (faqId) => {
    try {
      await axios.delete(`http://localhost:8098/faq/deleteFAQ/${faqId}`);
      setFaqs(faqs.filter((faq) => faq._id !== faqId));
      toast.success("FAQ Deleted", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Flip,
        progressBarClassName: "bg-gray-800",
        style: { fontFamily: "Rubik" },
      });
    } catch {
      setError("Failed to delete FAQ.");
      toast.error("Failed to delete FAQ", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Flip,
        progressBarClassName: "bg-gray-800",
        style: { fontFamily: "Rubik" },
      });
    }
  };

  // Contact message functions
  const handleDeleteMessage = async (messageId) => {
    try {
      // First, find the contact in the contactMessages array
      const contactToDelete = contactMessages.find(
        (contact) => contact._id === messageId
      );

      // Check if the contact exists and its status
      if (!contactToDelete) {
        throw new Error("Contact not found");
      }

      if (contactToDelete.status === "open") {
        toast.error("Cannot delete contact with open status", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Flip,
          progressBarClassName: "bg-gray-800",
          style: { fontFamily: "Rubik" },
        });
        return;
      }

      // If status is not "open", proceed with deletion
      await axios.delete(
        `http://localhost:8098/contacts/deleteContact/${messageId}`
      );
      setContactMessages(
        contactMessages.filter((message) => message._id !== messageId)
      );
      toast.success("Message Deleted", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Flip,
        progressBarClassName: "bg-gray-800",
        style: { fontFamily: "Rubik" },
      });
    } catch (error) {
      setError("Failed to delete message.");
      toast.error(error.message || "Failed to delete Message", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Flip,
        progressBarClassName: "bg-gray-800",
        style: { fontFamily: "Rubik" },
      });
    }
  };
  return (
    <div>
      <Header />
      <div className="flex w-full flex-col dark text-foreground bg-background">
        <div className="flex items-center p-4 font-primaryRegular">
          <Tabs
            aria-label="Blogger Tabs"
            className="flex-1"
            onSelectionChange={setActiveTab}
            selectedKey={activeTab}
            size="lg"
            color="primary"
          >
            <Tab key="FAQ" title="FAQ" />
            <Tab key="ContactUs" title="Contact Messages" />
          </Tabs>
        </div>
        <div className="p-4">
          {activeTab === "FAQ" && (
            <div>
              <Helmet>
                <title>FAQ | Support Dashboard</title>
              </Helmet>
              <Button
                className="bg-primary text-foreground mb-4"
                onPress={onAddFAQOpen}
              >
                Add New FAQ
              </Button>
              <Modal
                isOpen={isAddFAQOpen}
                onOpenChange={onAddFAQOpenChange}
                className="dark text-foreground bg-background"
              >
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader className="flex flex-col gap-1">
                        Add New FAQ
                      </ModalHeader>
                      <ModalBody>
                        <Input
                          label="Question"
                          placeholder="Enter the question"
                          value={newFAQQuestion}
                          onChange={(e) => setNewFAQQuestion(e.target.value)}
                          fullWidth
                        />
                        <Textarea
                          label="Answer"
                          placeholder="Enter the answer"
                          value={newFAQAnswer}
                          onChange={(e) => setNewFAQAnswer(e.target.value)}
                          fullWidth
                        />
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          color="danger"
                          variant="light"
                          onPress={onClose}
                        >
                          Cancel
                        </Button>
                        <Button color="primary" onPress={handleAddFAQ}>
                          Add FAQ
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>
              <Modal
                isOpen={isEditFAQOpen}
                onOpenChange={onEditFAQOpenChange}
                className="dark text-foreground bg-background"
              >
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader className="flex flex-col gap-1">
                        Edit FAQ
                      </ModalHeader>
                      <ModalBody>
                        <Input
                          label="Question"
                          placeholder="Enter the question"
                          value={editFAQQuestion}
                          onChange={(e) => setEditFAQQuestion(e.target.value)}
                          fullWidth
                        />
                        <Textarea
                          label="Answer"
                          placeholder="Enter the answer"
                          value={editFAQAnswer}
                          onChange={(e) => setEditFAQAnswer(e.target.value)}
                          fullWidth
                        />
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          color="danger"
                          variant="light"
                          onPress={onClose}
                        >
                          Cancel
                        </Button>
                        <Button color="primary" onPress={handleUpdateFAQ}>
                          Update FAQ
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>
              {loading ? (
                <Spinner />
              ) : error ? (
                <p className="text-red-500 text-center">Error: {error}</p>
              ) : faqs.length === 0 ? (
                <p className="text-center text-gray-400">No FAQs available</p>
              ) : (
                <Table aria-label="FAQ Table" className="mt-4">
                  <TableHeader className="bg-foreground">
                    <TableColumn>QUESTION</TableColumn>
                    <TableColumn>ANSWER</TableColumn>
                    <TableColumn>ACTIONS</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {faqs.map((faq) => (
                      <TableRow key={faq._id}>
                        <TableCell width={350}>{faq.question}</TableCell>
                        <TableCell>{faq.answer}</TableCell>
                        <TableCell width={220}>
                          <Button
                            color="primary"
                            className="mr-2"
                            onPress={() => {
                              setEditingFAQ(faq);
                              setEditFAQQuestion(faq.question);
                              setEditFAQAnswer(faq.answer);
                              onEditFAQOpen();
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            color="danger"
                            onPress={() => handleDeleteFAQ(faq._id)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          )}
          {activeTab === "ContactUs" && (
            <div>
              <Helmet>
                <title>Contact | Support Dashboard</title>
              </Helmet>
              {loading ? (
                <Spinner />
              ) : error ? (
                <p className="text-red-500 text-center">Error: {error}</p>
              ) : contactMessages.length === 0 ? (
                <p className="text-center text-gray-400">
                  No messages available
                </p>
              ) : (
                <Table aria-label="Contact Messages Table" className="mt-4">
                  <TableHeader className="bg-foreground">
                    <TableColumn>USERNAME</TableColumn>
                    <TableColumn>EMAIL</TableColumn>
                    <TableColumn>MESSAGE</TableColumn>
                    <TableColumn>Status</TableColumn>
                    <TableColumn>ACTIONS</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {contactMessages.map((contact) => (
                      <TableRow key={contact._id}>
                        <TableCell>{contact.username}</TableCell>
                        <TableCell>{contact.email}</TableCell>
                        <TableCell>
                          {contact.messages[0]?.content.length > 50
                            ? `${contact.messages[0].content.substring(
                                0,
                                50
                              )}...`
                            : contact.messages[0]?.content ||
                              "No message content"}
                        </TableCell>
                        <TableCell>
                          <Chip
                            color={statusColorMap[contact.status]}
                            className="capitalize"
                            variant="flat"
                          >
                            {contact.status}
                          </Chip>
                        </TableCell>
                        <TableCell>
                          <Button
                            color="danger"
                            className="mr-2"
                            onPress={() => handleDeleteMessage(contact._id)}
                          >
                            Delete
                          </Button>

                          <Button
                            color="success"
                            className="mr-2"
                            onPress={() => {
                              handleChatOpen(contact._id);
                            }}
                          >
                            {contact.status === "closed" ? "View" : "Reply"}
                          </Button>
                          <Button
                            color="primary"
                            className="mr-2"
                            onClick={() => handleUpdateStatus(contact._id)}
                            isDisabled={contact.status === "closed"}
                          >
                            {console.log(contact.status)}
                            {contact.status === "closed" ? "Closed" : "Close"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
              <ChatModal
                isOpen={isChatOpen}
                onOpenChange={() => setIsChatOpen(false)}
                contactId={selectedContactId}
              />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactDash;
