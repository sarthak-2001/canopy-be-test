const request = require("request")
const cheerio = require("cheerio")
const login_new = require("./login_new")
const Notice = require('../models/notice')
require("../db/mongoose")
//TODO : FIND A WAY TO SAVE ITEMS
const data_writer = async (data)=>{
    console.log('hiiii');
    // data.forEach(element => {
    //     var notice = new Notice({Notices:{attention:element.attention,date:element.date,id:element.id,id_link:element.id_link,posted_by:element.posted_by,title:element.title}})
        
    //     console.log('done');
        
   
    // });
    for (let index = 0; index < data.length; index++) {
            var notice = new Notice({Notices:{attention:data[index].attention,date:data[index].date,id:data[index].id,id_link:data[index].id_link,posted_by:data[index].posted_by,title:data[index].title}})
            await notice.Notices.push(notice)
            await notice.save()
            console.log('sad');
            
        
    }
    
}


const notice = function(uid, pwd, cb) {
	login_new(uid, pwd, (cookie) => {
		let option = {
			url: "https://hib.iiit-bh.ac.in/m-ums-2.0/app.misc/nb/docList.php",
			headers: {
				Cookie: cookie,
				Referer: "https://hib.iiit-bh.ac.in/m-ums-2.0/start/here/?w=766&h=749"
			}
		}

		request.get(option, (err, res, html) => {
			// console.log(html);
			let data = { Notices: [] }
			const $ = cheerio.load(html)
			$("tr")
				.next()
				.each((i, x) => {
					const date = $(x)
						.find("td")
						.eq(0)
						.text()
						.replace(/\s\s+/g, "")
					const title = $(x)
						.find("td")
						.eq(1)
						.text()
						.replace(/\s\s+/g, "")
					const posted_by = $(x)
						.find("td")
						.eq(2)
						.text()
						.replace(/\s\s+/g, "")
					const attention = $(x)
						.find("td")
						.eq(3)
						.text()
						.replace(/\s\s+/g, "")
					const id_link = $(x)
						.find("a")
						.attr("href")
					const id = $(x)
						.find("a")
						.attr("href")
						.slice(17)
					data.Notices.push({
						date: date,
						title: title,
						id: id,
						id_link: id_link,
						posted_by: posted_by,
						attention: attention
					})
                })
                cb(data.Notices)
			
		})
	})
}

async function db_creator() {
    const notice = await Notice.findOne({})
    console.log(notice);
    
    if(!notice){
        console.log('no notice');
        const new_notice = new Notice({})
        await new_notice.save()
        
    }
    else{
    console.log('notice is threre');
    }
    
}

// notice('b418045','sarthka@2001',(data)=>{
//     console.log(data);
    
// })



notice('b418018','Barbie17*',data_writer)
   

// db_creator()
// module.exports = notice