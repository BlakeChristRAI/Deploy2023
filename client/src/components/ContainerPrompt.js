import React, { useState, useCallback,useEffect } from "react";
import Filters from "./Filters";
import Filters2 from "./Filters2";
import PortalDrawer from "./PortalDrawer";
import styles from "../styles/ContainerPrompt.module.css";
import { useUser } from "../UserContext";
import axios from "axios";
const config = require('../config'); // Adjust the path accordingly

const ContainerPrompt = () => {
  const { currentPrompt } = useUser();

  const instance = axios.create({
    baseURL: config.baseURL,
  });
  
  const [isFrameOpen, setFrameOpen] = useState(false);
  const [isFrame1Open, setFrame1Open] = useState(false);
  //const [isFilters2Open, setFilters2Open] = useState(false); // Add this line

  const { loggedInEmail, addGeneratedUrl } = useUser();
  const [text2ImagePayLoadData, setText2ImagePayLoadData] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  //const [text2ImageServerResponse, setText2ImageServerResponse] = useState("");

  const handleText2ImagePayloadChange = (e) =>
    setText2ImagePayLoadData(e.target.value);

  const openFrame = useCallback(() => {
    setFrameOpen(true);
  }, []);
  const closeFrame = useCallback(() => {
    setFrameOpen(false);
  }, []);
  // const openFrame1 = useCallback(() => {
  //   setFrame1Open(true);
  // }, []);
  const closeFrame1 = useCallback(() => {
    setFrame1Open(false);
  }, []);
  // const openFilters2 = useCallback(() => {    setFilters2Open(true);  }, []);
  // const closeFilters2 = useCallback(() => {    setFilters2Open(false);  }, []);
  // const onButtonGenerate1Click = useCallback(() => {}, []);

  useEffect(() => {
    setText2ImagePayLoadData(currentPrompt);
  }, [currentPrompt]); // Run this effect whenever currentPrompt changes



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      // Basic email validation
      if (!/^\S+@\S+\.\S+$/.test(loggedInEmail)) {
        setError("Invalid email address.");
        return;
      }

      const response = await instance.post("/api/LoraTextToImage/payLoadData", {
        email: loggedInEmail, // Use user.email directly
        text2ImagePayLoadData,
      });

      if (response.data && response.data.message) {
        //setText2ImageServerResponse(response.data.message);
        // Clear the form upon successful submission
        setText2ImagePayLoadData("");
        // Add the generated URL to user context
        addGeneratedUrl(response.data.message);
      } else {
        setError("Unexpected server response. Please try again.");
      }
    } catch (error) {
      console.error("Error, please enter a text prompt.", error.message);
      setError("Error processing Text To Image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className={styles.containerprompt}>
        <div className={styles.maininput}>
          <div className={styles.input}>


          <input
              className={styles.aGraphicPrintOversized}
              placeholder="“Dress me in... a white oversized hoodie, cargo pants, white sneakers, and urban accessories for a cool and edgy streetwear look.”"
              value={text2ImagePayLoadData }  
              onChange={handleText2ImagePayloadChange}
              type="text"
            />


            <button className={styles.containericon} onClick={openFrame}>
              <img
                className={styles.editingSvg}
                alt=""
                src="/IconAISparkle.svg"
              />
            </button>
          </div>

          <form className="form" onSubmit={handleSubmit}>
            <button
              type="submit"
              disabled={loading}
              className={styles.buttongenerate}
            >
              <div className={styles.containericontext}>
                <img
                  className={styles.editingSvg1}
                  alt=""
                  src="/IconAIWand.svg"
                />
                <div className={styles.heading3}>
                  {loading ? "Processing..." : "Generate"}
                </div>
              </div>
            </button>
          </form>
        </div>


        <div className={styles.mobileinput}>
          <div className={styles.input1}>
            <input
              className={styles.aGraphicPrintOversized1}
              placeholder="“Dress me in... a white oversized hoodie, cargo pants, white sneakers, and urban accessories for a cool and edgy streetwear look.”"
              value={text2ImagePayLoadData}
              onChange={handleText2ImagePayloadChange}
              type="text"
            />
          </div>
          <div className={styles.buttons}>

          
            <button className={styles.buttonfilters} onClick={openFrame}>
              <div className={styles.editingSvg2}>
                <img
                  className={styles.sliderhorizontal3Icon}
                  alt=""
                  src="/IconAISparkleWhite.svg"
                />
              </div>
              {/* <div className={styles.heading31}>Filters</div> */}
            </button>

            <button className={styles.buttongenerate1} onClick={handleSubmit}>
              <img className={styles.editingSvg1} alt="" src="/IconAIWand.svg" />
              <div className={styles.heading3}>{loading ? "Processing..." : "Generate"}</div>
            </button>
          </div>
        </div>


        {loading && <p>Loading...</p>}
        {error && <p className="error-message">{error}</p>}



        {/* <div className={styles.mobileinput}></div> */}
        {/* ************************************************************************  */}
        {/* ****************************** MOBILE INTERFACE********************  */}
        {/* *************************************************************************  */}
        {/* <div className={styles.mobileinput}>
          <div className={styles.input1}>
            <input
              className={styles.aGraphicPrintOversized1}
              placeholder="“A graphic-print oversized hoodie, high-waisted cargo pants, chunky sneakers, and urban accessories for a cool and edgy streetwear look.”"
              type="text"
            />
          </div>
          <div className={styles.buttons}>
            <button className={styles.buttonfilters} onClick={openFrame1}>
              <div className={styles.editingSvg2}>
                <img
                  className={styles.sliderhorizontal3Icon}
                  alt=""
                  src="/IconAISparkle.svg"
                />
              </div>
              <div className={styles.heading31}>Filters</div>
            </button>

            <button className={styles.buttongenerate1} onClick={handleSubmit}>
              <img
                className={styles.editingSvg1}
                alt=""
                src="/IconAIWand.svg"
              />
              <div className={styles.heading32}>Generate</div>
            </button>
          </div>
        </div> */}





        {/* ************************************************************************  */}
        {/* ******************************END OF MOBILE INTERFACE********************  */}
        {/* *************************************************************************  */}
      </section>

      {isFrameOpen && (
        <PortalDrawer
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Bottom"
          onOutsideClick={closeFrame}
        >
          <Filters onClose={closeFrame} />
        </PortalDrawer>
      )}

      {isFrame1Open && (
        <PortalDrawer
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Bottom"
          onOutsideClick={closeFrame1}
        >
          <Filters2 onClose={closeFrame1} />
        </PortalDrawer>
      )}
    </>
  );
};

export default ContainerPrompt;
