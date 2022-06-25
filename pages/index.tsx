import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import {
  ChangeEvent,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import { PlusCircleIcon, XIcon } from "@heroicons/react/solid";

const Home: NextPage = () => {
  enum Style {
    Linear = "linear",
    Ease = "ease",
    EaseIn = "easeIn",
    EaseOut = "easeOut",
    EaseInOut = "easeInOut",
  }

  enum Transform {
    Rotate = "rotate",
    Translate = "translate",
    Scale = "scale",
  }

  interface Effect {
    transform: Transform;
    quantity: string;
  }

  interface Animation {
    name: string;
    duration: string;
    effectList: Array<Effect>;
  }

  const outputArea = useRef<HTMLTextAreaElement>(null);
  const [createdAnimation, setCreatedAnimation] = useState<Animation>({
    name: "",
    duration: "0",
    effectList: [],
  });

  const animationToString = (ani: Animation) => {
    var effectText = "";

    ani.effectList.map((efe, ind) => {
      effectText += `\n\t\t\t\t"${
        Math.floor((ind * 100) / (ani.effectList.length - 1)) || 0
      }": {
        \t\t\ttransform: "${efe.transform}(${efe.quantity})",
        \t\t},`;
    });

    return `module.exports = {
        theme: {
          extend: {
            animation: {
              ${ani.name}: "${ani.name} ${ani.duration}s infinite",
            },
            keyframes: {
              ${ani.name}: {${effectText}
              },
            },
          },
        },
        variants: {
          extend: {},
        },
        plugins: [],
      };
      `;
  };

  const createBlankEffect = () => {
    setCreatedAnimation({
      name: createdAnimation.name,
      duration: createdAnimation.duration,
      effectList: [
        ...createdAnimation.effectList,
        { transform: Transform.Scale, quantity: 0 },
      ],
    });
  };

  const modifyEffect = (e: ChangeEvent<HTMLSelectElement>, ind: number) => {
    var myEffect: Transform;

    if (e.target.value == Transform.Rotate) {
      myEffect = Transform.Rotate;
    } else if (e.target.value == Transform.Scale) {
      myEffect = Transform.Scale;
    } else if (e.target.value == Transform.Translate) {
      myEffect = Transform.Translate;
    } else {
      console.log("ERROR IN SELECT");
      myEffect = Transform.Scale;
    }

    const modifiedEffect: Effect = {
      transform: myEffect,
      quantity: createdAnimation.effectList[ind].quantity,
    };

    console.log(modifiedEffect);

    setCreatedAnimation({
      duration: createdAnimation.duration,
      name: createdAnimation.name,
      effectList: [
        ...createdAnimation.effectList.slice(0, ind),
        modifiedEffect,
        ...createdAnimation.effectList.slice(
          ind + 1,
          createdAnimation.effectList.length
        ),
      ],
    });
  };

  const deleteEffect = (ind: number) => {
    setCreatedAnimation({
      duration: createdAnimation.duration,
      name: createdAnimation.name,
      effectList: [
        ...createdAnimation.effectList.slice(0, ind),
        ...createdAnimation.effectList.slice(
          ind + 1,
          createdAnimation.effectList.length
        ),
      ],
    });
  };

  const quantityChange = (e: ChangeEvent<HTMLInputElement>, ind: number) => {
    const modifiedEffect: Effect = {
      transform: createdAnimation.effectList[ind].transform,
      quantity: e.target.value,
    };
    setCreatedAnimation({
      duration: createdAnimation.duration,
      name: createdAnimation.name,
      effectList: [
        ...createdAnimation.effectList.slice(0, ind),
        modifiedEffect,
        ...createdAnimation.effectList.slice(
          ind + 1,
          createdAnimation.effectList.length
        ),
      ],
    });
  };

  useEffect(() => {
    setOutputText(animationToString(createdAnimation));
  }, [createdAnimation]);

  const [outputText, setOutputText] = useState<string>("");

  return (
    <div className="min-h-screen">
      <Head>
        <title>Tailwind Animation Helper</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="grid w-full grid-cols-3">
        {/* Output box + Settings area */}

        <div className="col-span-2 h-fit min-h-screen bg-red-500 p-10">
          <textarea
            className="aspect-video w-full resize-none p-5"
            ref={outputArea}
            value={outputText}
          ></textarea>
          <div className="mt-5 bg-white p-10">
            <input
              placeholder="Animation Name"
              className="mx-2 bg-red-500"
              type="text"
              onChange={(e) => {
                setCreatedAnimation({
                  name: e.target.value,
                  duration: createdAnimation.duration,
                  effectList: createdAnimation.effectList,
                });
              }}
            />
            <input
              placeholder="Duration"
              className="mx-2 bg-red-500"
              type="text"
              onChange={(e) => {
                setCreatedAnimation({
                  name: createdAnimation.name,
                  duration: e.target.value,
                  effectList: createdAnimation.effectList,
                });
              }}
            />
            <input
              placeholder="Animation Name"
              className="mx-2 bg-red-500"
              type="text"
            />
          </div>
        </div>

        {/* Effects Adder */}
        <div className="col-span-1 min-h-screen overflow-y-scroll bg-blue-500 p-10">
          <div className="overflow-hidden rounded-xl bg-white">
            {createdAnimation.effectList.map((efe, ind) => {
              return (
                <div
                  key={ind}
                  className="relative h-20 border-b border-blue-500"
                >
                  <select
                    onChange={(e) => {
                      modifyEffect(e, ind);
                    }}
                    name="cars"
                    id="cars"
                  >
                    <option value={Transform.Scale}>Scale</option>
                    <option value={Transform.Rotate}>Rotate</option>
                    <option value={Transform.Translate}>Translate</option>
                  </select>
                  <input
                    onChange={(e) => {
                      quantityChange(e, ind);
                    }}
                    placeholder="quantity"
                  ></input>
                  <button
                    onClick={() => {
                      deleteEffect(ind);
                    }}
                    className="absolute top-2 right-2 rounded-full bg-blue-500 text-white"
                  >
                    <XIcon className="h-5 w-5"></XIcon>
                  </button>
                </div>
              );
            })}

            <button
              onClick={() => createBlankEffect()}
              className="w-full text-blue-500"
            >
              <PlusCircleIcon className="mx-auto h-16 w-16"></PlusCircleIcon>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
