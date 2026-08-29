import satori from "satori";
import { SITE } from "@/config";
import loadGoogleFonts from "../loadGoogleFont";
// Vite `?inline` yields a base64 data URI, which satori embeds directly.
import dp from "@/assets/images/dp.png?inline";

export default async () => {
  return satori(
    {
      type: "div",
      props: {
        style: {
          background: "#fefbfb",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        children: [
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                top: "-1px",
                right: "-1px",
                border: "4px solid #000",
                background: "#ecebeb",
                opacity: "0.9",
                borderRadius: "4px",
                display: "flex",
                justifyContent: "center",
                margin: "2.5rem",
                width: "88%",
                height: "80%",
              },
            },
          },
          {
            type: "div",
            props: {
              style: {
                border: "4px solid #000",
                background: "#fefbfb",
                borderRadius: "4px",
                display: "flex",
                justifyContent: "center",
                margin: "2rem",
                width: "88%",
                height: "80%",
              },
              children: {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "94%",
                    height: "100%",
                  },
                  children: [
                    {
                      type: "div",
                      props: {
                        style: {
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          flex: 1,
                          paddingRight: "24px",
                          overflow: "hidden",
                        },
                        children: [
                          {
                            type: "p",
                            props: {
                              style: {
                                fontSize: 64,
                                fontWeight: "bold",
                                margin: 0,
                              },
                              children: SITE.title,
                            },
                          },
                          {
                            type: "p",
                            props: {
                              style: { fontSize: 28, marginTop: "20px" },
                              children: SITE.desc,
                            },
                          },
                          {
                            type: "p",
                            props: {
                              style: {
                                fontSize: 28,
                                fontWeight: "bold",
                                marginTop: "36px",
                              },
                              children: new URL(SITE.website).hostname,
                            },
                          },
                        ],
                      },
                    },
                    {
                      // Bottom-anchored so the bust crop sits on the frame edge.
                      type: "img",
                      props: {
                        src: dp,
                        width: 380,
                        height: 380,
                        style: { alignSelf: "flex-end" },
                      },
                    },
                  ],
                },
              },
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      embedFont: true,
      fonts: await loadGoogleFonts(SITE.title + SITE.desc + SITE.website),
    }
  );
};
