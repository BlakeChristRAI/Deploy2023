import { useState, useCallback } from "react";
import styles from "../styles/ContainerAesthetic.module.css";
import { useUser } from '../UserContext';

const ContainerAesthetic = () => {
  const { setCurrentActivityPrompt } = useUser();

  const [isActive, setIsActive] = useState(false);
  const onActivity0Click = useCallback(() => {    
    /* PROMPT: A simple and classic casual look with a white t-shirt and blue jeans. Add white sneakers and a brown leather belt for a clean and effortless outfit.*/
       setCurrentActivityPrompt("Dress me in... a simple and classic casual look with a white t-shirt and blue jeans.");
  
       setIsActive(!isActive);
  }, [isActive,setCurrentActivityPrompt]);


  
  const onActivity1Click = useCallback(() => {
    /* 
       PROMPT: A laid-back summer day outfit featuring a Hawaiian shirt and comfortable sandals. 
       Combine the shirt's vibrant print with coordinating shorts, add some trendy sunglasses, 
       and accessorize with a beachy hat or a cool straw tote to complete the look
    */
       setCurrentActivityPrompt("Dress me in... a summer day Hawaiian shirt and comfortable sandals.");
  }, [setCurrentActivityPrompt]);

  const onActivity2Click = useCallback(() => {
    /* 
       PROMPT: a sporty and stylish activewear outfit featuring Nike gear. Select a Nike sports bra, leggings, or shorts, 
       and pair them with a matching Nike workout top or jacket. Don't forget to add your favorite Nike sneakers for both performance and style. 
       Finish the look with some essential gym accessories like a water bottle and a fitness tracker.
    */
       setCurrentActivityPrompt("Dress me in... a sporty and stylish activewear outfit featuring Nike gear.");
  }, [setCurrentActivityPrompt]);

  const onActivity3Click = useCallback(() => {
    /* 
       PROMPT: A n elegant and alluring date night outfit for a romantic evening. Opt for a sleek, little black dress paired with stylish heels. 
       Accessorize with statement jewelry, a clutch purse, and a touch of subtle makeup for a chic and captivating look.
    */
       setCurrentActivityPrompt("Dress me in... a date night outfit for a romantic evening. Black dress paired with stylish heels. Accessorize with statement jewelry, a clutch purse, and a touch of subtle makeup.");

  }, [setCurrentActivityPrompt]);

  const onActivity4Click = useCallback(() => {
    /* 
       PROMPT: A a trendy and eye-catching party outfit for a night out. 
       Choose a sequined or glittery mini dress in a bold color, and pair it with strappy high heels. 
       Add statement accessories, like oversized earrings or a chunky necklace, and finish the look with a stylish clutch bag.
    */
       setCurrentActivityPrompt("Dress me in... a trendy and eye-catching party outfit for a night out.");
  }, [setCurrentActivityPrompt]);

  const onActivity5Click = useCallback(() => {
    /* 
       A a cozy and fashionable winter outfit to keep you warm during the cold months. 
       Start with a wool or cashmere sweater in a rich, deep color, and pair it with dark jeans or trousers. 
       Add knee-high boots, a stylish coat, and a matching scarf and beanie to complete the look. 
    */
       setCurrentActivityPrompt("Dress me in... a cozy and fashionable winter outfit to keep you warm during the cold months.");

  }, [setCurrentActivityPrompt]);

  const onActivity6Click = useCallback(() => {
    /* 
       A sophisticated and unisex fancy outfit that's perfect for a special event. 
       Choose a well-fitted black blazer and matching trousers. Underneath, wear a classic white dress shirt or blouse. 
       Accessorize with a stylish bowtie or silk scarf. 
       Finish the look with elegant black leather shoes and a clutch bag for a touch of glamour. 
    */
       setCurrentActivityPrompt("Dress me in... a sophisticated, fancy outfit that's perfect for a special event. ");

  }, [setCurrentActivityPrompt]);

  const onActivity7Click = useCallback(() => {
    /* 
       a chic cocktail dress in a rich, jewel-toned color or a classic black dress. 
       Accessorize with statement jewelry, a clutch bag, and stylish high heels. 
       For a finishing touch, consider a tailored blazer or a shawl to keep you warm in cooler venues. 
    */
       setCurrentActivityPrompt("Dress me in... a cocktail dress with statement jewelry, a clutch bag, and stylish shoes. ");

  }, [setCurrentActivityPrompt]);

  const onActivity8Click = useCallback(() => {
    /* 
       A moisture-wicking or quick-drying clothing suitable for the weather, such as a breathable t-shirt or moisture-wicking top, along with durable cargo pants or hiking shorts. 
       Don't forget a wide-brimmed hat for sun protection and sunglasses. 
       Complete the look with comfortable and supportive hiking boots or trail shoes, and a sturdy backpack to carry your essentials. 
    */
       setCurrentActivityPrompt("Dress me in... a outdoors hiking outfit with a rainjacket and hat");

  }, [setCurrentActivityPrompt]);

  const onActivity9Click = useCallback(() => {
    /* 
       a bright and colorful top, whether it's a graphic t-shirt, a vibrant blouse, or a funky patterned shirt. 
       Pair it with your favorite jeans or a flirty skirt, and add some whimsical accessories like statement earrings, funky socks, or a fun belt.
    */
       setCurrentActivityPrompt("Dress me in... a bright and colorful top, whether it's a graphic t-shirt, a vibrant blouse, or a funky patterned shirt.");

  }, [setCurrentActivityPrompt]);

  const onActivity10Click = useCallback(() => {
    /* 
       a pair of flared, high-waisted jeans or corduroy pants. Choose a flowing, patterned blouse with bell sleeves for that signature 70s vibe. 
       Accessorize with a wide-brimmed floppy hat, round sunglasses, and platform shoes. 
       Add a fringed vest or jacket for extra flair, and complete the look with some long, layered necklaces. 
    */
       setCurrentActivityPrompt("Dress me in... a 70's style outfit that is groovy");

  }, [setCurrentActivityPrompt]);

  const onActivity11Click = useCallback(() => {
    /* 
       a pair of high-waisted, acid-wash jeans or leggings. Add an oversized graphic sweatshirt with bold, colorful prints. 
       Accessorize with scrunchy socks, high-top sneakers, and a chunky plastic belt. 
       Don't forget to style your hair with big curls, and add some statement accessories like hoop earrings and chunky bracelets.
    */
       setCurrentActivityPrompt("Dress me in... a 80's style outfit with acid-wash jeans or leggings and an oversized graphic sweatshirt with bold, colorful prints.");

  }, [setCurrentActivityPrompt]);

  const onActivity12Click = useCallback(() => {
    /* 
       a pair of well-fitting jeans or casual pants, and pair them with a comfortable t-shirt or blouse. Add sneakers or low-profile shoes for a relaxed vibe. 
       Accessorize with a wristwatch, and consider layering with a light jacket or cardigan for added versatility. 
    */
       setCurrentActivityPrompt("Dress me in... a pair of well-fitting jeans or casual pants, and pair them with a comfortable t-shirt or blouse.");

  }, [setCurrentActivityPrompt]);

  const onActivity13Click = useCallback(() => {
    /* 
       A comfortable and cozy lounge outfit for a relaxing day at home. 
       Select a soft, oversized hoodie or sweatshirt in a soothing color, paired with comfortable joggers or lounge pants. 
       Slip into your favorite slippers, and add a warm blanket for extra comfort.
    */
       setCurrentActivityPrompt("Dress me in... a comfortable and cozy lounge outfit for a relaxing day at home. Select a soft sweatshirt, paired with slippers, and add a warm blanket for extra comfort.");

  }, [setCurrentActivityPrompt]);

  const onActivity14Click = useCallback(() => {
    /* 
       a pair of stretchy, breathable leggings or comfortable jeans. Layer a cozy sweater or hoodie over a lightweight t-shirt for versatility. 
       Slip-on shoes are a great choice for easy security checks at the airport. 
       Don't forget a spacious and organized backpack or tote bag to carry your essentials. 
    */
       setCurrentActivityPrompt("Dress me in... a pair of stretchy, breathable leggings or comfortable jeans and oversized tshirt. Don't forget a spacious and organized backpack or tote bag to carry your essentials.");

  }, [setCurrentActivityPrompt]);

  const onActivity15Click = useCallback(() => {
    /* 
       PROMPT: a well-fitted tailored suit in a classic color like navy, gray, or black. 
       Pair it with a crisp dress shirt or blouse, and a coordinating tie or a stylish scarf. 
       Accessorize with polished leather dress shoes and a sleek leather briefcase. 
    */
       setCurrentActivityPrompt("Dress me in... a well-fitted tailored suit in a classic color like navy, gray, or black. Accessorize with polished leather dress shoes and a sleek leather briefcase.");

  }, [setCurrentActivityPrompt]);

  const onActivity16Click = useCallback(() => {
    /* 
       PROMPT: a waterproof trench coat or rain jacket, and pair it with waterproof boots to keep your feet dry. 
       Add a wide-brimmed waterproof hat and a compact, colorful umbrella to stay protected. 
       Complete the look with dark jeans or leggings and a cozy, water-resistant sweater or hoodie. 
    */
       setCurrentActivityPrompt("Dress me in... a waterproof trench coat or rain jacket, and pair it with waterproof boots to keep your feet dry.");

  }, [setCurrentActivityPrompt]);


  return (
    <header className={styles.containeraesthetic}>
      <button className={`${styles.activity} ${isActive ? 'active' : ''}`} onClick={onActivity0Click}>
        <img className={styles.objectsToolsSvg} alt="" src="/IconAstehics/casual.svg" />
        <div className={styles.text3}>Casual</div>
      </button>


      <button className={styles.activity} onClick={onActivity1Click}>
        <img
          className={styles.objectsToolsSvg}
          alt=""
          src="/IconAstehics/summer.svg"
        />
        <div className={styles.text3}>Summer</div>
      </button>


      <button className={styles.activity} onClick={onActivity2Click}>
        <img
          className={styles.objectsToolsSvg}
          alt=""
          src="/IconAstehics/activewear.svg"
        />
        <div className={styles.text3}>Activewear</div>
      </button>

      <button className={styles.activity} onClick={onActivity3Click}>
        <img
          className={styles.objectsToolsSvg}
          alt=""
          src="/IconAstehics/datenight.svg"
        />
        <div className={styles.text3}>Date</div>
      </button>

      <button className={styles.activity} onClick={onActivity4Click}>
        <img
          className={styles.objectsToolsSvg}
          alt=""
          src="/IconAstehics/party.svg"
        />
        <div className={styles.text3}>Party</div>
      </button>

      <button className={styles.activity} onClick={onActivity5Click}>
        <img
          className={styles.objectsToolsSvg}
          alt=""
          src="/IconAstehics/winter.svg"
        />
        <div className={styles.text3}>Winter</div>
      </button>

      <button className={styles.activity} onClick={onActivity6Click}>
        <img
          className={styles.objectsToolsSvg}
          alt=""
          src="/IconAstehics/fancy.svg"
        />
        <div className={styles.text3}>Fancy</div>
      </button>


      <button className={styles.activity} onClick={onActivity7Click}>
        <img
          className={styles.objectsToolsSvg}
          alt=""
          src="/IconAstehics/cocktail.svg"
        />
        <div className={styles.text3}>Cocktail</div>
      </button>


      <button className={styles.activity} onClick={onActivity8Click}>
        <img
          className={styles.objectsToolsSvg}
          alt=""
          src="/IconAstehics/outdoor.svg"
        />
        <div className={styles.text3}>Outdoor</div>
      </button>


      <button className={styles.activity} onClick={onActivity9Click}>
        <img
          className={styles.objectsToolsSvg}
          alt=""
          src="/IconAstehics/fun.svg"
        />
        <div className={styles.text3}>Fun</div>
      </button>


      <button className={styles.activity} onClick={onActivity10Click}>
        <img
          className={styles.objectsToolsSvg}
          alt=""
          src="/IconAstehics/70theme.svg"
        />
        <div className={styles.text3}>70's</div>
      </button>


      <button className={styles.activity} onClick={onActivity11Click}>
        <img
          className={styles.objectsToolsSvg}
          alt=""
          src="/IconAstehics/80theme.svg"
        />
        <div className={styles.text3}>80's</div>
      </button>


      <button className={styles.activity} onClick={onActivity12Click}>
        <img
          className={styles.objectsToolsSvg}
          alt=""
          src="/IconAstehics/everday.svg"
        />
        <div className={styles.text3}>Everday</div>
      </button>


      <button className={styles.activity} onClick={onActivity13Click}>
        <img
          className={styles.objectsToolsSvg}
          alt=""
          src="/IconAstehics/lounge.svg"
        />
        <div className={styles.text3}>Lounge</div>
      </button>

      <button className={styles.activity} onClick={onActivity14Click}>
        <img
          className={styles.objectsToolsSvg}
          alt=""
          src="/IconAstehics/travel.svg"
        />
        <div className={styles.text3}>Travel</div>
      </button>


      <button className={styles.activity} onClick={onActivity15Click}>
        <img
          className={styles.objectsToolsSvg}
          alt=""
          src="/IconAstehics/business.svg"
        />
        <div className={styles.text3}>Business</div>
      </button>

      <button className={styles.activity} onClick={onActivity16Click}>
        <img
          className={styles.objectsToolsSvg}
          alt=""
          src="/IconAstehics/raingear.svg"
        />
        <div className={styles.text3}>Rain</div>
      </button>
   

    </header>
    
  );
};

export default ContainerAesthetic;

