import React from "react";
import { Attendee } from "./state/searchSlice";

interface PrintButtonProps {
    attendee: Attendee;
}

const PrintButton: React.FC<PrintButtonProps> = ({attendee}) =>{
    const handlePrint = ()=>{
        const printWindow = window.open("", "", "width=600,height=400");
    
        if (printWindow) {
          printWindow.document.write(`
            <html>
            <head>
              <title>Print Tag</title>
              <style>
                /* Add custom styles for printed content */
                body {
                  font-family: Arial, sans-serif;
                  margin: 20px;
                }
                h3 {
                  color: black;
                }
                p {
                  margin: 0;
                  padding: 5px 0;
                }
              </style>
            </head>
            <body>
              <h3>Attendee Information</h3>
              <p>Name: ${attendee.first_name} ${attendee.last_name}</p>
              <p>Company: ${attendee.company}</p>
              <p>Badge Type: ${attendee.badge_type}</p>
              <p>Email: ${attendee.email}</p>
              <p>Phone: ${attendee.phone}</p>
            </body>
            </html>
          `);
          printWindow.document.close();
          printWindow.focus();
          printWindow.print();
          printWindow.close();
        }
      };
    
      return (
        <button onClick={handlePrint}>
          Print Tag
        </button>
      );
    };
    
    export default PrintButton;
   