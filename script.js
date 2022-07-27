const add = document.querySelector(".add")
const cont = document.querySelector('.cont')
let allItems = []

function eventt() {
    const addItem = document.querySelector(".addItem")
    if (addItem === null) {
        cont.insertAdjacentHTML(
            "afterend",
            `
            <div class="addItem  startAnim ">
                <div class="iconDiv" >
                    <img src="imagesAndIcons/icon.png" alt="icon" class="icon">
                </div>
            <textarea class="texts textanimstart"></textarea>
            </div>
            `
        )
        //onclick="eventt()"
        const iconDiv = document.querySelector(".iconDiv")
        iconDiv.addEventListener("click", (el) => {
            save()
        })
    } else {
        const texts = document.querySelector('.texts')

        addItem.classList.toggle('startAnim')
        addItem.classList.toggle('endAnim')

        texts.classList.toggle('textanimstart')
        texts.classList.toggle('textanimend')

        setTimeout(() => {
            addItem.remove()
        }, 500)
    }
}

function save() {
    const texts = document.querySelector('.texts')
    // console.log(texts.value);
    const add = document.querySelector(".add")
    add.insertAdjacentHTML(
        "beforebegin",
        `
        <div class="grid-item">
            <p>${texts.value}</p>
            <div class="items-box">
                    <div class="grid-item-doing items"></div>
                    <div class="grid-item-change items"></div>
                    <div class="grid-item-delete items"></div>
                </div>
        </div>
        `
    )
    eventt()
    removeNote()
    doing()
    changeText()
}

add.addEventListener('click', eventt)

function changeText() {
    let grid_item_changeArray = Array.from(document.querySelectorAll(".grid-item-change"))

    grid_item_changeArray.forEach(item => {
        item.addEventListener("click", (teg) => {
            let textareaContent = teg.currentTarget.parentElement.previousElementSibling.innerText
            let textarea = teg.currentTarget.parentElement.previousElementSibling


            function functionForIf() {
                const addItem = document.querySelector(".addItem")
                if (addItem === null) {
                    cont.insertAdjacentHTML(
                        "afterend",
                        `
                    <div class="addItem  startAnim ">
                    <div class="iconDiv" >
                    <img src="imagesAndIcons/icon.png" alt="icon" class="icon">
                    </div>
                    <textarea class="texts textanimstart">${textareaContent}</textarea>
                    </div>
                    `
                    )

                    const iconDiv = document.querySelector(".iconDiv")
                    const texts = document.querySelector('.texts')

                    iconDiv.addEventListener("click", () => {
                        textarea.innerText = texts.value

                        functionForIf()
                    })

                } else {
                    let texts = document.querySelector('.texts')

                    addItem.classList.toggle('startAnim')
                    addItem.classList.toggle('endAnim')

                    texts.classList.toggle('textanimstart')
                    texts.classList.toggle('textanimend')

                    setTimeout(() => {
                        addItem.remove()
                    }, 500)
                }
            }
            functionForIf()
        })
    })
}
changeText()

function removeNote() {
    let grid_item_delete = Array.from(document.getElementsByClassName("grid-item-delete"))

    grid_item_delete.forEach(item => {
        item.addEventListener("click", (el) => {
            el.currentTarget.parentElement.parentElement.remove()
        })
    })
}
removeNote()


let count = 0

function doing() {
    let greenDiv = Array.from(document.getElementsByClassName("grid-item-doing"))

    greenDiv.forEach(el => {
        let bool = false

        let doingCount = document.querySelector(".doingCount")
        let grid_item = document.getElementsByClassName("grid-item")

        el.addEventListener("click", (item) => {

            if (bool === false) {
                count++
                item.currentTarget.classList.toggle("activGreenDiv")
                bool = true
            } else {
                count--
                item.currentTarget.classList.toggle("activGreenDiv")
                bool = false
            }
            doingCount.innerText = grid_item.length + "/" + count
        })
    })
}
doing()



function search() {
    let search = document.querySelector(".search");
    let itemsGrid = Array.from(document.querySelectorAll(".grid-item"))
    if (search.value !== "") {
        allItems = [...itemsGrid]

        let gridItem_Arr = [...itemsGrid]
        console.log("aaaaa", gridItem_Arr)
        let pArr = gridItem_Arr.map(item => item.firstElementChild)

        let filterArr = []
        pArr.filter((item, i) => {
            if ((item.innerText.includes(search.value)) && search.value !== "") {
                filterArr.push(i)
            }
        })
        let filteredDivs = filterArr.map(divId => gridItem_Arr[divId])

        console.log("bbbbb", gridItem_Arr)
        let grid_item = Array.from(document.querySelectorAll(".grid-item"))
        grid_item.forEach(divs => divs.remove())

        let content = document.querySelector(".content")
        // filteredDivs.forEach(item => content.append(item))
        filteredDivs.forEach(elem => {
            content.insertAdjacentElement(
                "beforeend", elem
            )
        })
    } else {

        console.log("ccccc", allItems)

        let content = document.querySelector(".content")
        allItems.forEach(elem => {
            content.insertAdjacentElement(
                "beforeend", elem
            )
        })
    }
}

let input = document.querySelector(".search")
document.addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
        console.log("yyyyyyyyyy")
        e.preventDefault()
        search()
    }
}, { passive: true})

let searchIcon = document.querySelector(".searchIcon")
searchIcon.addEventListener("click", () => {
    search()
})