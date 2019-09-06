const request = require('request')
const cheerio = require('cheerio')
const login_new = require('./login_new')

const notice_data = function (uid,pwd,n_id) {
    login_new(uid,pwd, (cookie)=>{
        let option ={
            url: "https://hib.iiit-bh.ac.in/m-ums-2.0/app.misc/nb/docDet.php?docid="+n_id,
			headers: {
				Cookie: cookie,
				Referer: "https://hib.iiit-bh.ac.in/m-ums-2.0/app.misc/nb/docList.php"
			}
        }
    

    request.get(option, (err,res,html)=>{
        const $ = cheerio.load(html)
        console.log($.html());
        console.log('\n\n\n');
        
        const notice_html = $('table').html()
        console.log(notice_html);
        let attachment = $("a").attr('href')
        if(attachment == 'docList.php'){
            attachment = ""
        }
        console.log('\n\n\n');
        console.log(attachment);
        
                
    })
})
}

// notice_data('b418045','sarthak@2001','11216')
notice_data('b418045','sarthak@2001','11231')