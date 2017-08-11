new Promise((resolve, reject) =>{

}).then(()=>{

})

function Request(url, method, cb){
    return new Promise((resolve, reject)=>{
method = method || 'GET'
let req = new XMLHttpRequest()
req.onreadystatechange= ()=> {
    let isRequestDone = req.readyState === XMLHttpRequest.DONE
    let isRequestSuccess = req.status === 200
    if (isRequestDone && isRequestSuccess){
        resolve(JSON.parse(req.responseText))
    } else if (isRequestDone && !isRequestSuccess){
        reject()

    }
}

req.open(method, url)
req.send()
    }).then(cb)
}
const repos = []
const members = []
const GitHubORG = 'HackYourFuture'
const HYFReposApiEndpoint = `https://api.github.com/orgs/HackYourFuture/repos`
const HYFMembersApiEndpiont = `https://api.github.com/orgs/${GitHubORG}/members`

function RenderRepoList(){
    let $parent = document.querySelector('.repo-list ul')
    $parent.innerHTML = repos.join('')

}
function RenderMemberList(){
    let $parent = document.querySelector('.member-list ul')
    $parent.innerHTML = members.join('')
}
window.onload = () => {
    Request(HYFReposApiEndpoint, 'GET', (repositories) => {
        //Here we loop Async
    repositories.forEach(function (repo) {
    let name = repo.name
    let url = repo.url
    //Here we're adding an element to the const repos
    repos.push(`<li><a href="${url}">${name}</a></li>`)
    // let item = `<a href="${url}">${name}</a>`
    })
    RenderRepoList()
    })
    Request(HYFMembersApiEndpiont, 'GET', (memberList) =>{
        memberList.forEach(function (member){
            let name = member.login
            let url = member.url
            let avatar = member.avatar_url
            members.push(`<li><a href="${url}">${name}</br></a> </br> <img src="${avatar}" width= "150"></br> </li></br>`)
        })
    RenderMemberList()
    })
    

}