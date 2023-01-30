import { View, Text } from "react-native";
import React from "react";
import { Button, Dialog, Paragraph, Portal } from "react-native-paper";

const CustomDialog = ({
  visible,
  title,
  paragraph,
  yesButtonAction,
  cancelButtonAction,
  dismissable = true,
  onDismiss,
}) => {
  return (
    <Portal>
      <Dialog visible={visible} dismissable={dismissable} onDismiss={onDismiss}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Paragraph>{paragraph}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={yesButtonAction}>Ja</Button>
          <Button onPress={cancelButtonAction}>Abbrechen</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default CustomDialog;
