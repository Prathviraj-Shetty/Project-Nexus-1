let btn=document.getElementById('newMemes')
let after=''
btn.addEventListener('click',()=>{
    if(document.getElementById('memes'))
    {
        document.getElementById('memes').remove() 
    }
    let feed=document.getElementById('feed')
    let  parentDiv=document.createElement('div')
    parentDiv.id="memes"
    fetch(`https://www.reddit.com/r/memes.json?after=${after}`)
    .then(response=>response.json())
    .then(body=>{
        after=body.data.after
        for(let index=0;index<body.data.children.length;index++)
        {
           if(body.data.children[index].data.post_hint==="image")
           {
            let div=document.createElement('div')
            let image=document.createElement('img')
            image.src=body.data.children[index].data.url_overridden_by_dest
            image.id="box"
            div.appendChild(image)
            parentDiv.appendChild(div)
        }
        }
       feed.appendChild(parentDiv)
    }
        )
})



