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

    public static errorValidator(titulo: string, error: any) {
        return Swal.fire({
            title: titulo,
            text: this.listarErros(error),
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

    private static listarErros(error: any): string {
        let text = "";
        error.forEach((erro: any, index: number) => {
            text += (index > 0 ? ', ' : '') + erro.errorMessage;
        });
        return text;
    }
}