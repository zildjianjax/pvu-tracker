import React, { useState, useContext } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "./Modal";
import { SubmitHandler, useForm, UseFormHandleSubmit } from "react-hook-form";
import { firestore, serverTimestamp } from "../lib/firebase";
import { UserContext } from "../lib/context";
import { randomBytes } from "crypto";
import Alert from "sweetalert2";

const AddLand = ({ selectedAccount }: { selectedAccount: string }) => {
  const { user } = useContext(UserContext);

  const [isActive, setIsActive] = useState(false);
  const handleClose = () => {
    setIsActive(false);
  };
  const handleOpen = () => {
    setIsActive(true);
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit: SubmitHandler<{ address: string }> = async (data) => {
    const land_id = randomBytes(20).toString("hex");

    const userDoc = firestore
      .doc(`users/${user?.uid}`)
      .collection("lands")
      .doc(land_id);
    await userDoc.set({
      address: data.address,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    Alert.fire("", "Successfully Added", "success").then(() => {
      reset();
      handleClose();
    });
  };
  return (
    <div>
      <button className="btn btn-success" onClick={handleOpen}>
        Add Land
      </button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal isActive={isActive}>
          <ModalOverlay onClick={handleClose} />
          <ModalContent>
            <ModalHeader onClose={handleClose}>
              <h2 className="font-medium text-xl">Add Land</h2>
            </ModalHeader>
            <ModalBody>
              <div className="flex items-center space-x-4">
                <label htmlFor="" className="font-medium text-sm">
                  Name:
                </label>
                <input
                  type="text"
                  className="block p-2 border w-full rounded"
                  {...register("address", { required: true })}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <button type="submit" className="btn btn-success">
                Save
              </button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </form>
    </div>
  );
};

export default AddLand;
