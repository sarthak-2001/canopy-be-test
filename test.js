const x = {
    Notices: [
      {
        date: '2019-09-04',
        title: 'Java Coding Test (Class Test - 2) on 10th September 2019',
        id: '11256',
        id_link: 'docDet.php?docid=11256',
        posted_by: 'Ayes Chinmay',
        attention: 'B. Tech (5th Sem CE)'
      },
      {
        date: '2019-09-04',
        title: 'CE First year class on Saturday, 7 September',
        id: '11255',
        id_link: 'docDet.php?docid=11255',
        posted_by: 'Tanutrushna Panigrahi',
        attention: '1st year students'
      }
    ]
}
const y = x.Notices

y.forEach((v)=>{
    console.log(v.date);
    
})
