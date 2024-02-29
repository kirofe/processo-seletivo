import Swal from 'sweetalert2'

export class SwalFire {
    public static sucesso(titulo: string) {
        return Swal.fire({
            title: titulo,
            icon: "success",
        });
    }

    public static error(titulo: string, text: string) {
        return Swal.fire({
            title: titulo,
            text: text,
            icon: "error",
        });
    }



    public static detele(titulo: string, texto: string) {
        return Swal.fire({
            title: titulo,
            text: texto,
            icon: "warning",
            showDenyButton: true,
            showCancelButton: true,
            showConfirmButton: false,
            cancelButtonText: "Cancelar",
            denyButtonText: `Remover`
        });
    }
}