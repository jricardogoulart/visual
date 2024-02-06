// Formatando Telefone (XX) XXXX-XXXX e/ou (XX) XXXXX-XXXX
document.getElementById('clientPhone').addEventListener('input', function (e) {
    var x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
    e.target.value = x[1] ? '(' + x[1] : '';
    if (x[2]) {
        e.target.value += ') ' + x[2];
        if (x[2].length === 5) {
            e.target.value += '-';
        }
    }
    if (x[3]) {
        e.target.value += '-' + x[3];
    }
});

// Formatando CPF/CNPJ  XXX.XXX.XXX-XX e/ouXX. XXX. XXX/0001-XX
document.getElementById('clientDoc').addEventListener('input', function(e) {
    var value = e.target.value.replace(/\D/g, ''); // Remove todos os caracteres não-dígitos

    if (value.length <= 11) {
        // Formatação para CPF
        value = value.replace(/(\d{3})(\d{1,3})?(\d{1,3})?(\d{1,2})?/, function(_regex, p1, p2, p3, p4) {
            return [p1, p2, p3].filter(Boolean).join('.') + (p4 ? '-' + p4 : '');
        });
    } else if (value.length > 11 && value.length <= 14) {
        // Formatação para CNPJ
        value = value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, function(_regex, p1, p2, p3, p4, p5) {
            return `${p1}.${p2}.${p3}/${p4}-${p5}`;
        });
    }
    
    e.target.value = value; // Atualiza o valor do input
});



// Utilizando a API do VIA CEP para Já Adicionar o CEP no Cadastro
document.getElementById('cep').addEventListener('blur', function (e) {
    var cep = e.target.value.replace(/\D/g, '');
    if (cep.length !== 8) {
        alert("CEP inválido!");
        return;
    }

    var url = 'https://viacep.com.br/ws/' + cep + '/json/';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                alert("CEP não encontrado!");
                return;
            }
            document.getElementById('street').value = data.logradouro;
            document.getElementById('district').value = data.bairro;
            document.getElementById('city').value = data.localidade;
            document.getElementById('state').value = data.uf;
        })
        .catch(error => {
            alert("Erro ao buscar o CEP!");
            console.error(error);
        });
});

document.getElementById('cep').addEventListener('input', function (e) {
    var valor = e.target.value;

    // Remove caracteres que não sejam números
    valor = valor.replace(/\D/g, '');

    // Formata para o padrão CEP (#####-###)
    if (valor.length > 5) {
        valor = valor.replace(/^(\d{5})(\d)/, "$1-$2");
    }

    e.target.value = valor;
});

document.addEventListener('DOMContentLoaded', function() {
    // Seleciona todos os inputs que precisam ser validados
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="number"]');

    // Função para verificar a validade e aplicar/remover a classe 'valid'
    function validateInput(input) {
        if (input.checkValidity()) {
            input.classList.add('valid');
            input.classList.remove('invalid'); // Se você decidir usar uma classe para inválido
        } else {
            input.classList.remove('valid');
            input.classList.add('invalid'); // Se você decidir usar uma classe para inválido
        }
    }

    // Adiciona o evento de 'blur' a cada input para validar individualmente
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateInput(this);
        });
    });

    // Adiciona um listener ao formulário para validar todos os campos no submit
    const form = document.querySelector('form');
    form.addEventListener('submit', function(event) {
        let formIsValid = true;
        inputs.forEach(input => {
            validateInput(input);
            if (!input.checkValidity()) {
                formIsValid = false;
            }
        });
        
        // Se o formulário não for válido, previne o envio
        if (!formIsValid) {
            event.preventDefault();
        }
    });
});
