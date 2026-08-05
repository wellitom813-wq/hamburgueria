let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

const senhaAdmin = "1234";

let editando = null;


// LOGIN

function fazerLogin(){

    let senha = document.getElementById("senha").value;

    if(senha === senhaAdmin){

        document.getElementById("loginTela").style.display = "none";

        document.getElementById("painel").style.display = "block";

        mostrarProdutos();

    }else{

        document.getElementById("erroLogin").innerHTML =
        "Senha incorreta!";

    }

}


function sair(){

    document.getElementById("painel").style.display = "none";

    document.getElementById("loginTela").style.display = "flex";

}


// SALVAR PRODUTO

function salvarProduto(){

    let nome = document.getElementById("nome").value;

    let preco = Number(document.getElementById("preco").value);

    let descricao = document.getElementById("descricao").value;

    let foto = document.getElementById("foto").value;

    let categoria = document.getElementById("categoria").value;

    let esgotado = document.getElementById("esgotado").checked;


    if(nome === "" || preco === 0){

        alert("Preencha nome e preço");

        return;

    }


    let produto = {

        nome,
        preco,
        descricao,
        foto,
        categoria,
        esgotado

    };


    if(editando !== null){

        produtos[editando] = produto;

        editando = null;

    }else{

        produtos.push(produto);

    }


    localStorage.setItem(
        "produtos",
        JSON.stringify(produtos)
    );


    limparCampos();

    mostrarProdutos();

}



function limparCampos(){

    document.getElementById("nome").value = "";

    document.getElementById("preco").value = "";

    document.getElementById("descricao").value = "";

    document.getElementById("foto").value = "";

    document.getElementById("esgotado").checked = false;

}



// MOSTRAR PRODUTOS

function mostrarProdutos(){

    let lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";


    produtos.forEach((produto,index)=>{


        lista.innerHTML += `

        <div class="produto">

            <h3>${produto.nome}</h3>

            <p>Categoria: ${produto.categoria}</p>

            <p>Preço: R$ ${produto.preco.toFixed(2)}</p>

            <p>${produto.descricao}</p>

            ${
                produto.esgotado
                ?
                "<p class='esgotado'>🚫 ESGOTADO</p>"
                :
                "<p>✅ Disponível</p>"
            }


            <div class="botoes">

                <button class="editar"
                onclick="editarProduto(${index})">
                Editar
                </button>


                <button class="excluir"
                onclick="excluirProduto(${index})">
                Excluir
                </button>

            </div>

        </div>

        `;


    });

}



// EDITAR

function editarProduto(index){

    let produto = produtos[index];

    document.getElementById("nome").value = produto.nome;

    document.getElementById("preco").value = produto.preco;

    document.getElementById("descricao").value = produto.descricao;

    document.getElementById("foto").value = produto.foto;

    document.getElementById("categoria").value = produto.categoria;

    document.getElementById("esgotado").checked = produto.esgotado;


    editando = index;


}



// EXCLUIR

function excluirProduto(index){

    if(confirm("Deseja excluir este produto?")){

        produtos.splice(index,1);

        localStorage.setItem(
            "produtos",
            JSON.stringify(produtos)
        );

        mostrarProdutos();

    }

}
