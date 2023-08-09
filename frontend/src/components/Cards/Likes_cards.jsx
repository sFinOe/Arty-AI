import React, { useEffect, useState } from "react";
import { Text, Image, Grid, Spacer, Dropdown } from "@nextui-org/react";
import { GetLikes } from "api/user";
import { RxDotsVertical } from "react-icons/rx";
import { Skeleton } from "@arco-design/web-react";

export function Likes_cards() {
  const [likes, setLikes] = useState([]);

  const handleActions = (actionKey) => {
    // if (actionKey === "logout") {
    //   HandleLogout();
    // }
  };

  useEffect(() => {
    const loading = ["skeleton", "skeleton", "skeleton", "skeleton"];
    GetLikes()
      .then((res) => {
        console.log(res.body);
        if (res.body.length === 1) setLikes(["skeleton", "skeleton", "skeleton", "skeleton"]);
        else setLikes([...res.body.slice(1).reverse(), ...loading]);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(likes);
  }, []);

  return (
    <div>
      {likes.slice(0, 4).map((item, index) => (
        <React.Fragment key={index}>
          <hr />
          {item === "skeleton" ? (
            <Grid css={{ padding: "15px 15px" }}>
              <Skeleton
                text={{
                  rows: 2,
                  width: ["95%", "30%"],
                }}
                image
                animation
              />
            </Grid>
          ) : (
            <Grid className="Orders_container">
              <Grid className="Orders_filds">
                <Grid>
                  <Image
                    src={item}
                    style={{
                      width: 60,
                      height: 60,
                      objectFit: "fill",
                      borderRadius: "8px",
                    }}
                  />
                </Grid>
                <Spacer x={0.5} />
                <Grid css={{ lineHeight: 0.5 }}>
                  <Text
                    h2
                    css={{
                      fontSize: "16px",
                      fontFamily: "poppins",
                      fontWeight: "500",
                      padding: "10px 0px 0px 0px",
                    }}
                  >
                    Classic Image Ai Generated
                  </Text>
                  <Text
                    h2
                    css={{
                      fontSize: "15px",
                      fontFamily: "poppins",
                      fontWeight: "400",
                      padding: "10px 0px 0px 0px",
                      color: "#616976",
                    }}
                  >
                    Updated about 9 hours ago
                  </Text>
                </Grid>
              </Grid>
              <Dropdown placement="bottom-right">
                <Dropdown.Trigger css={{ cursor: "pointer" }}>
                  <Grid>
                    <RxDotsVertical size={22} />
                  </Grid>
                </Dropdown.Trigger>
                <Dropdown.Menu aria-label="User menu actions" color="secondary" onAction={(actionKey) => handleActions(actionKey)}>
                  <Dropdown.Item key="1">
                    <a href="/home/favorites">
                      <Text size={15} color="inherit">
                        View Details
                      </Text>
                    </a>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Grid>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
