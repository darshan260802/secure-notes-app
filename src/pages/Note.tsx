import { useLayoutEffect, useState } from "react";
import { createNote, getNotes } from "../api/note";
import { useNavigate } from "react-router";
import { MessageInstance } from "antd/es/message/interface";
import { Flex, Form, Input, List, Modal } from "antd";
import { FileAddTwoTone, PoweroffOutlined } from "@ant-design/icons";
import { userLogout } from "../api/auth";

export default function Note({ messageApi }: { messageApi: MessageInstance }) {
  const navigation = useNavigate();
  const [notes, setNotes] = useState<any[]>([]);
  const [form] = Form.useForm();
  const [utilState, setUtilState] = useState<any>({
    modalOpen: false,
    modalLoading: false,
  });

  useLayoutEffect(loadNotes, []);

  function loadNotes() {
    getNotes()
      .then((data: any) => {
        setNotes(data.data.notes);
        console.log(data.notes, data);

      })
      .catch((error) => {
        if (error.status && error.status === 401) {
          navigation("/auth");
          return;
        }
        console.error(error);
      });
  }

  function closeModal() {
    setUtilState((s: any) => ({ ...s, modalOpen: false }));
  }

  function handleSubmit(values: any) {
    setUtilState((s: any) => ({ ...s, modalLoading: true }));
    createNote(values)
      .then((_: any) => {
        messageApi.success("Note created successfully!");
        loadNotes();
        closeModal();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setUtilState((s: any) => ({ ...s, modalLoading: false }));
      });
  }

  function handleLogout(){
    userLogout().then(() => {
      navigation('/auth')
    })
  }

  return (
    <div className="notes-wrapper">
      <Flex className="flex">
        <div className="list">
          <List
            size="small"
            style={{ height: "100%" }}
            header={
              <Flex
                justify="space-between"
                align="center"
                className="notes-header"
              >
                <h2>Notes</h2>
                <Flex>
                  <FileAddTwoTone
                    style={{ fontSize: 30 }}
                    onClick={() =>
                      setUtilState((s: any) => ({ ...s, modalOpen: true }))
                    }
                    title="Create Note"
                  />
                  <PoweroffOutlined style={{ fontSize: 30 }}
                    onClick={handleLogout}
                    title="Logout" />
                </Flex>
              </Flex>
            }
            bordered
            dataSource={notes}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta title={item.title} description={item.description} />
              </List.Item>
            )}
          />
        </div>
      </Flex>
      <Modal
        title="Create Note"
        centered
        confirmLoading={utilState.modalLoading}
        onCancel={closeModal}
        onClose={closeModal}
        onOk={() => form.submit()}
        open={utilState.modalOpen}
      >
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            name={"title"}
            rules={[
              { required: true, message: "Please input your note title!" },
            ]}
          >
            <Input placeholder="Title" />
          </Form.Item>
          <Form.Item
            name={"description"}
            rules={[
              { required: true, message: "Please input your note content!" },
            ]}
          >
            <Input.TextArea placeholder="Content" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
