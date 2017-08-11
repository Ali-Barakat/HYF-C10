// let str = ''
// console.time('Concatenate a string')
// for (let k = 0; k < 1000; k++){
//     str += 'Ciao!'
// }
// console.timeEnd('Concatenate a string')

// str = ''
// console.time('Concatenate a string with type conversion')
// for (let k = 0; k < 1000; k++){
//     str += 6
// }
// console.timeEnd('Concatenate a string with type conversion')

// let arr = [...Array(1000)].map(el => 'Ciao')
// console.time('Reduce')
// arr.reduce((prev, next) => prev+next, '')
// console.timeEnd('Reduce')

// console.time('Join')
// arr.join('')
// console.timeEnd('Join')

// str = ''
// console.time('forEach')
// arr.forEach(item => {
//     str += item
// } )
// console.timeEnd('forEach')

// -------------------------------------------------

function Request(url, method, cb ){
    return new Promise((resolve, reject) =>{
    method = method || 'GET'
    let req = new XMLHttpRequest()
    
    req.onreadystatechange = () =>{
        let isRequestDone = req.readyState === XMLHttpRequest.DONE
        let isRequestSuccess = req.readyState === 200
        if (isRequestDone && isRequestSuccess){
            resolve(JSON.parse(req.responseText))
        } else if(isRequestDone && !isRequestSuccess){
            reject(req, req.status)
        }
    }
    req.open(method, url)
    req.send()
  }).then(cb)
}
// const repos = []
const members = []
const GitApi = 'https://api.github.com'
const GitHubORG = 'HackYourFuture'
const HYFReposApiEndpoint = `${GitApi}/orgs/${GitHubORG}/repos`
const HYFMembersApiEndpiont = `${GitApi}/orgs/${GitHubORG}/members`

function RenderList(selector, html){
    let $parent = document.querySelector(selector)
    $parent.innerHTML = html
}

function GetHtmlRepoList(repositories){
    return repositories.map( function(repo){
        let name = repo.name
        let url = repo.url
        return `<li><a href="${url}">${name}</a></li>`
    }).join('')
}

function GetHtmlMemberList(members){
    return members.map((member) => {
        let name = member.login
        let url = member.url
        let avatar = member.avatar_url
        return `<li><a href ="${url}"${name}</a> <img src="${avatar}" width="150"></br></li>`
    }).join('')
}

window.onload = () => {
    let $repoList = '.repo-list ul'
    let $memberList = '.member-list ul'

    Request(HYFReposApiEndpoint, 'GET')
    .then(GetHtmlRepoList)
    .then(RenderList.bind(null, $repoList))
    .catch(RenderList.bind(null, $repoList, `<li>Error</li>`))

    Request(HYFMembersApiEndpiont, 'GET')
    .then(GetHtmlMemberList)
    .then(RenderList.bind(null, $memberList))
    .catch(RenderList.bind(null, $memberList, `<li>Error</li>`))
}


// let myFirstPromise = new Promise((resolve, reject) => {
//   // We call resolve(...) when what we were doing made async successful, and reject(...) when it failed.
//   // In this example, we use setTimeout(...) to simulate async code. 
//   // In reality, you will probably be using something like XHR or an HTML5 API.
//   setTimeout(function(){
//     resolve("Success!"); // Yay! Everything went well!
//   }, 250);
// });

// myFirstPromise.then((successMessage) => {
//   // successMessage is whatever we passed in the resolve(...) function above.
//   // It doesn't have to be a string, but if it is only a succeed message, it probably will be.
//   console.log("Yay! " + successMessage);
// });


// new Promise((resolve, reject) =>{
//     }).then(result =>{
//         return new Promise((resolve, reject) =>{

//         })
//     }).then()
//     .catch(error =>{

//     })