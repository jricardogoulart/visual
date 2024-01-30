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
document.getElementById('clientDoc').addEventListener('input', function (e) {
    var value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) { // CPF
        value = value.replace(/(\d{3})(\d{1,3})?(\d{1,3})?(\d{1,2})?/, function (_regex, p1, p2, p3, p4) {
            var cpf = p1;
            if (p2) cpf += '.' + p2;
            if (p3) cpf += '.' + p3;
            if (p4) cpf += '-' + p4;
            return cpf;
        });
    } else { // CNPJ
        value = value.replace(/^(\d{2})(\d{1,3})?(\d{1,3})?(\d{1,4})?(\d{1,2})?/, function (_regex, p1, p2, p3, p4, p5) {
            var cnpj = p1;
            if (p2) cnpj += '.' + p2;
            if (p3) cnpj += '.' + p3;
            if (p4) cnpj += '/' + p4;
            if (p5) cnpj += '-' + p5;
            return cnpj;
        });
    }
    e.target.value = value;
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