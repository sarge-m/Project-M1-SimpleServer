const httpServer = require('http');
const url = require('url');
const fs = require('fs');

const replaceTemplate = require('./modules/replaceTemplate');


/// Read data from file
// Template
const tempLoans = fs.readFileSync(
    `${__dirname}/data/data.json`,
    'utf-8'
 );

 /////////////////////////////////
// Template
const templateHTMLLoans = fs.readFileSync(
    `${__dirname}/template/templateLoans.html`,
    'utf-8'
  );

 const dataObj = JSON.parse(tempLoans);// string to JavaScript Object JSON

////////////////////////////////
//Create Server
const server = httpServer.createServer( (req, res) =>{// call back function

  
    const {query,pathname} = url.parse(req.url, true); // object distructors
    if(query.id){// if there is query parameter named id read as string
        // Courses page
        if (pathname === '/' || pathname.toLowerCase() === '/loans') {
            res.writeHead(200, {// Every thing ran successfully
                'Content-type': 'text/html'
            });
            const loans = dataObj[Number(query.id)];// convert string to numeric value
            const strLoanID = JSON.stringify(loans);
            const loanHTML = replaceTemplate(templateHTMLLoans, loans);// function that will replace the course values in the HTML
            res.end(loanHTML);
        }
    } else if (pathname === '/') {
        res.end("You've reached the Loan calculation homepage.");
    }
    else{
            res.writeHead(404, {// Server did not find what you were looking for
                'Content-type': 'text/html'
            });
            res.end(`resource not found`)
        }
    });

//Start Listening to requests
server.listen(8000, 'localhost', ()=> {
    console.log('Listening to requests on port 8000');
});

