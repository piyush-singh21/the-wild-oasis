import { useState } from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
import CabinTable from "./CabinTable";
function AddCabin() {
    return (
        <Modal>
            <Modal.Open opens="cabin-form">
                <Button>Add new cabin</Button>
            </Modal.Open>
            <Modal.Window name="cabin-form">
                <CreateCabinForm />
            </Modal.Window>
            <Modal.Open opens="table">
                <Button>Cabin Table</Button>
            </Modal.Open>
            <Modal.Window name="table">
                <CabinTable />
            </Modal.Window>
        </Modal>)
}
// function AddCabin() {
//     const [isOpenModal, setIsOpenModal] = useState(false);
//     return (
//         <>
//             <Button onClick={() => setIsOpenModal((prev) => !prev)}>
//                 Add new cabin
//             </Button>
//             {isOpenModal &&
//                 <Modal
//                     onClose={() => setIsOpenModal(false)}>
//                     <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
//                 </Modal>
//             }
//         </>
//     )
// }

export default AddCabin;