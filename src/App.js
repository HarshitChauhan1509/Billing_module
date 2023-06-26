import './App.css';
import { useRef } from 'react';
import Data from './data';
import ReactToPrint from 'react-to-print';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const totalAmount = () => {
  const gst = Data.order.orderAmount * (Data.gstRate/100);
  const sum = Data.order.orderAmount + gst;
  return sum;
}

function App() {
  const componentRef = useRef();
  const handleGeneratePdf = () => {
    html2canvas(componentRef.current , {allowTaint: true, useCORS: true
    })
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 50, 210, 0);
        pdf.save("invoice.pdf");
      })
		
	};
  
  return (
    <>
    <div ref={componentRef} className="container">

      <div className="header">
        <div className="logo">
          <img src={Data.logoImg} alt='logo.png' />
        </div>
        <div className="companyName" >

          {Data.companyName}
          
        </div>

      </div>
      <div>
        <div className=" flex justify-between" >
          <div className="companyAdd" >
            <label>Company Address:</label>
            <div>
            {Data.companyAdd}
            </div> 
          </div>
          <div className="BillingAdd" >
            <label>Billing Address:</label>
            <div>
            {Data.billingAdd}
            </div>
          </div>
        </div>
        <div className=" mt-4">
          <div>
            <label>GST Registration Number:</label>
            {Data.gstNo}
          </div>
          <div>
            <label>PAN Number:</label>
            {Data.panNo}
          </div>
        </div>
        <div className=" flex justify-between">
          <div className='mt-4'>
            <div>
              <label>Order Number:</label>
                {Data.order.orderNo}
            </div>
            <div>
              <label>Order date:</label>
                {Data.order.orderDate}
            </div>
          </div>
          <div className='mt-4'>
            <div>
              <label>Invoice Number:</label>
                {Data.invoice.invoiceNo}  
            </div>
            <div>
              <label>Invoice deitails:</label>
                {Data.invoice.invoiceDetails}
            </div>
            <div>
              <label>Invoice date:</label>
                {Data.invoice.invoiceDate}
            </div>
            
          </div>
        </div>
      </div>
      <div className="text-center">
        <div>
          <table className="border border-[grey] w-full" >
            <tr className="border border-[black] bg-[grey]" >
              <th>Sr. No.</th>
              <th>Package</th>
              <th>Amount</th>
              <th>GST</th>
              <th>Total</th>
            </tr>
            <tr className='h-[50px]' >
              <td>1</td>
              <td>{Data.order.orderName}</td>
              <td>{Data.order.orderAmount}</td>
              <td>{Data.gstRate}%</td>
              <td>{totalAmount()}{" "}Rs</td>
            </tr>
            

          </table>
          <div className="flex flex-col justify-end items-end border border-[grey] w-full p-2" >
            <label>For {Data.companyName}:</label>
            <div>
              <img src={Data.signImg} alt='sinature.png' width='150px' height='150px'/>
            </div>
            <label>Authorized Signatory</label>
          </div>
        </div>

      </div>
    </div>
    <div className=' flex justify-center items-center mb-4 -mt-8 mx-2' >
        
        <ReactToPrint
          trigger={() => <button className='bg-[#48aa8b] rounded-md text-[white] p-2 w-[15%] mx-2'>Print</button>}
          content={() => componentRef.current}
        />

        <button onClick={handleGeneratePdf} className='bg-[#48aa8b] rounded-md text-[white] p-2 w-[15%] mx-2'>Download</button>
        
    </div>

    </>

  );
}

export default App;
