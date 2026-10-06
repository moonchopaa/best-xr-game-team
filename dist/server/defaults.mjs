export default {
  "cast": {
    "Yiwen": {
      "mark": "Y",
      "role": "A traveler searching for a taste of home",
      "bio": "Far from home, Yiwen misses her favorite bubble tea. She sets out to find a familiar flavor—and discovers a recipe of her own."
    },
    "Bobo": {
      "mark": "B",
      "role": "A boba buddy who lost his bounce",
      "bio": "This tapioca pearl misses his bouncy days. Listen to Bobo’s story and help him find his spring again."
    },
    "Moonalisa": {
      "mark": "M",
      "role": "The kind cow of the Milk River",
      "bio": "A gentle friend with a moon-shaped necklace. Moonalisa believes kindness can cross any language barrier."
    },
    "Maple Syrup": {
      "mark": "S",
      "role": "A shy neighbor in the maple woods",
      "bio": "A maple spirit who loves walks and wonderful hats. A friendly hello might lead to an unexpected gift."
    },
    "Tea Guardian": {
      "mark": "C",
      "role": "The guardian of the roadside café",
      "bio": "Offers weary travelers a place to rest. Keep exploring or head home with a different flavor—the choice is yours."
    }
  },
  "chapters": [
    "A Little Homesick",
    "The Tea Forest",
    "Bobo’s Request",
    "The Milk River",
    "Small talk with Maple",
    "A Sip of Your Own"
  ],
  "items": [
    [
      "tea",
      "❧",
      "Tea"
    ],
    [
      "boba",
      "●",
      "Boba"
    ],
    [
      "milk",
      "◓",
      "Milk"
    ],
    [
      "maple",
      "✦",
      "Maple"
    ]
  ],
  "image": "/media/3280224d-bc84-4b51-889c-880c994f0240",
  "sceneImages": {
    "nodes:start": "/place-home.jpg",
    "nodes:delivery": "/place-home.jpg",
    "nodes:library": "/place-library.jpg",
    "nodes:tea": "/place-forest.jpg",
    "nodes:teaRetry": "/place-forest.jpg",
    "nodes:teaWin": "/place-forest.jpg",
    "nodes:bobo": "/place-pond.jpg",
    "nodes:boboAir": "/place-pond.jpg",
    "nodes:boboMusic": "/place-pond.jpg",
    "nodes:boboWin": "/place-pond.jpg",
    "nodes:milk": "/place-river.jpg",
    "nodes:cows": "/place-river.jpg",
    "nodes:cowRetry": "/place-river.jpg",
    "nodes:milkWin": "/place-river.jpg",
    "nodes:maple": "/place-maple.jpg",
    "nodes:smallTalk": "/place-maple.jpg",
    "nodes:smallTalk2": "/place-maple.jpg",
    "nodes:mapleBye": "/place-maple.jpg",
    "nodes:mapleWin": "/place-maple.jpg",
    "nodes:finish": "/place-home.jpg",
    "nodes:ending": "/place-home.jpg",
    "endings:maple": "/place-home.jpg",
    "endings:clear": "/place-home.jpg",
    "endings:classic": "/place-home.jpg"
  },
  "nodes": {
    "start": {
      "ch": 0,
      "speaker": "Yiwen",
      "title": "Is there a recipe for homesickness?",
      "loc": "Yiwen’s new city",
      "narration": "Yiwen leaves her hometown to study in a strange new world, where mystery waits around every corner.",
      "line": "“Fragrant tea, chewy boba, creamy milk… Could I find that taste here, too?”",
      "image": "/media/5edfa563-80f4-4aa8-91bc-b526f810f756",
      "imageAlt": "Is there a recipe for homesickness? — Yiwen’s adventure.",
      "type": "image",
      "choices": [
        {
          "text": "Next",
          "next": "scene_2479e69632ba415790473813b0311828"
        }
      ]
    },
    "delivery": {
      "ch": 0,
      "speaker": "Yiwen",
      "title": "What I wanted wasn’t on the menu",
      "loc": "Yiwen’s new city",
      "narration": "...Except the food.\n\nNo matter what she eats, nothing quite hits the spot. The drinks are especially strange—none of them taste like home.\n\nOne day, she steps into a drink shop and orders a fruit tea. One sip is enough to make her face scrunch up. It is so sweet that she feels she might need a shot of insulin just to finish it.",
      "line": "“They look delicious, but… I miss more than just a sweet drink. This time, I want to make it myself.”",
      "image": "/media/cf5f02ef-a864-4615-a9ec-e781a9766caa",
      "imageAlt": "What I wanted wasn’t on the menu — Yiwen’s adventure.",
      "type": "image",
      "choices": [
        {
          "text": "Next",
          "next": "scene_6a3f0a9e1f28440bad574f93f73ce050"
        }
      ]
    },
    "library": {
      "ch": 0,
      "speaker": "Yiwen",
      "title": "A little map between the pages",
      "loc": "CDM — College of Dreamcraft & Magic",
      "narration": "After searching row upon row of shelves in the vast library, she finally finds a bubble tea recipe tucked inside an ancient tome.\n\nBut this is no ordinary recipe.\n\nIts three ingredients—tea leaves, tapioca pearls, and milk—are rare treasures scattered across the world. Each lies in a different magical land, watched over by a mysterious Guardian.\n\nTo make the drink she misses so much, Yiwen must leave the safety of her new home, travel to all three lands, and face the Guardians herself.",
      "line": "“Tea leaves, tapioca pearls, and milk. Even the ingredients have their own seasons. Let’s visit the Tea Forest first!”",
      "image": "/media/0ba5f4f3-5b92-409f-bf81-fcdfb8d2249d",
      "imageAlt": "A little map between the pages — Yiwen’s adventure.",
      "type": "image",
      "choices": [
        {
          "text": "Next",
          "next": "scene_3f127ef6a8864b0ab1de56988e279e98"
        }
      ]
    },
    "tea": {
      "ch": 1,
      "speaker": "Yiwen",
      "title": "Heating the tea leaves",
      "loc": "The Tea Forest",
      "narration": "A clue from the book: “Only when the world’s calmest Guardian loses his temper does his body heat up, allowing the tea leaves to be heated and ready to make hot tea base.”",
      "line": "“Now I find the tea leaves! But what should I say to make him angry?”",
      "image": "/media/174b35e2-1e39-49d0-87e2-5febc58b7275",
      "imageAlt": "Yiwen explores a lush, sunlit tea forest.",
      "choices": [
        {
          "text": "”Tea is too outdated, coffee is more trendy“",
          "next": "teaWin",
          "feedback": "Tea collected · Hot tea can be used to make milk tea",
          "item": "tea"
        },
        {
          "text": "”You taste like grass“",
          "next": "teaRetry",
          "feedback": ""
        },
        {
          "text": "”I don't like to drink you“",
          "next": "teaRetry",
          "feedback": ""
        }
      ]
    },
    "teaRetry": {
      "ch": 1,
      "speaker": "Yiwen",
      "title": "The tea leaves aren't angry enough",
      "loc": "The Tea Forest",
      "narration": "",
      "line": "“The tea leaves aren't angry enough. Let’s choose again.”",
      "image": "/media/91997b5c-82bf-4aa2-b809-d156dfa62958",
      "imageAlt": "Yiwen explores a lush, sunlit tea forest.",
      "choices": [
        {
          "text": "Return to the heating leaves again",
          "next": "tea",
          "feedback": ""
        }
      ]
    },
    "teaWin": {
      "ch": 1,
      "speaker": "Yiwen",
      "title": "A first ingredient, a little courage",
      "loc": "The Tea Forest",
      "narration": "The Tea Guardian grew angry at what you said. As his body temperature rose, the tea leaves in his hands began to heat up and were soon perfectly cooked.",
      "line": "“The leaves are so heated and ready to make hot tea. Now, let’s find some boba.”",
      "image": "/media/9a1d1c7d-deff-48f5-bace-e01785b68707",
      "imageAlt": "Yiwen explores a lush, sunlit tea forest.",
      "choices": [
        {
          "text": "Head to the Boba Pond",
          "next": "scene_e61c59ff977e43989640cf9db80035bf",
          "feedback": ""
        }
      ]
    },
    "bobo": {
      "ch": 2,
      "speaker": "Yiwen",
      "title": "Help me find my bounce",
      "loc": "Tapioca Pearl Land",
      "narration": "Yiwen starts trying to figure it out. Choose the right method to make Bobo bouncy again.",
      "line": "“Hmm... bouncy...”",
      "image": "/media/751cdb85-b84d-4aaf-a303-83d0e0d7bb08",
      "imageAlt": "Help me find my bounce — Yiwen and Bobo in Tapioca Pearl Land.",
      "choices": [
        {
          "text": "Play music and make Bobo dance",
          "next": "scene_e53759c6ede347bd9de0c0efd5ee0e41",
          "feedback": ""
        },
        {
          "text": "Dribble Bobo like a basketball",
          "next": "scene_aa85607371ff490fbdbd44f18ca27000",
          "feedback": ""
        },
        {
          "text": "Inject air into Bobo",
          "next": "scene_e909cf7d97914b7e8db8c530312de493",
          "feedback": ""
        }
      ]
    },
    "boboAir": {
      "ch": 2,
      "speaker": "Bobo",
      "title": "Floating, not bouncing!",
      "loc": "Tapioca Pearl Land",
      "narration": "However, something is going wrong.",
      "line": "“Wait, wait, wait! I’m getting way too big!”",
      "image": "/media/6619abaf-63a8-460d-b61e-be9ada834184",
      "imageAlt": "Floating, not bouncing! — Yiwen and Bobo in Tapioca Pearl Land.",
      "choices": [
        {
          "text": "Continue",
          "next": "scene_a96d4411561844899b60d6a556109067",
          "feedback": ""
        }
      ]
    },
    "boboMusic": {
      "ch": 2,
      "speaker": "Bobo",
      "title": "Maybe I danced a little too hard",
      "loc": "Tapioca Pearl Land",
      "narration": "Uh-oh, it seems this all-day dance party makes Bobo GAIN TOO MUCH MUSCLE, and he becomes less springy.",
      "line": "“And I feel... firm? Wasn’t I supposed to get bouncy???”",
      "image": "/media/279ede8b-3621-4b4d-9676-d43649871cd5",
      "imageAlt": "Maybe I danced a little too hard — Yiwen and Bobo in Tapioca Pearl Land.",
      "choices": [
        {
          "text": "Continue",
          "next": "scene_e8de716fc3ae4d4a934cdb2ef3f1942d",
          "feedback": ""
        }
      ]
    },
    "boboWin": {
      "ch": 2,
      "speaker": "Bobo",
      "title": "Better when we bounce together",
      "loc": "Tapioca Pearl Land",
      "narration": "Bobo’s body gleams and becomes perfectly plump.",
      "line": "“Look! I’ve got my bounce back!”",
      "image": "/media/cc902fd2-8453-4ad0-aa2c-23c2ceff38c1",
      "imageAlt": "Better when we bounce together — Yiwen and Bobo in Tapioca Pearl Land.",
      "choices": [
        {
          "text": "Continue",
          "next": "scene_da171575e39440fcbd0b1d2b731d75e3",
          "feedback": ""
        }
      ]
    },
    "milk": {
      "ch": 3,
      "speaker": "Moonalisa",
      "title": "Best milk",
      "loc": "The Mooland",
      "narration": "She arrives at a perfectly organized dairy farm, where everything runs like clockwork. At the center of the farm lives Moolalisa, a hardworking and sophisticated cow who takes milk very, very seriously.",
      "line": "No Dialogue. No Choice.",
      "image": "/media/28132ef9-5641-4574-880e-43133b9c8112",
      "imageAlt": "Yiwen meets Moonalisa.",
      "choices": [
        {
          "text": "I’ll make a clear boba tea without milk.",
          "next": "scene_e6065a20fd5740ac8ea2541fa5df11c7",
          "feedback": "Your own recipe · You’ve chosen to make boba tea without milk."
        }
      ]
    },
    "cows": {
      "ch": 3,
      "speaker": "Moonalisa",
      "title": "Milk Exam",
      "loc": "Moo Class",
      "narration": "The girl studies the choices. Beneath the buffalo’s portrait sits a glass of oddly colored milk. Beneath the Wagyu cow’s portrait is milk so thick that the spoon stands upright. The dairy cow’s glass looks fresh and inviting.",
      "line": "Which animal produces the best milk for your bubble tea?",
      "image": "/media/7f03c515-f246-42e8-a837-6494b039880d",
      "imageAlt": "Moonalisa gives an exam to Yiwen.",
      "choices": [
        {
          "text": "A dairy cow.",
          "next": "cowRetry",
          "feedback": ""
        },
        {
          "text": "A buffalo.",
          "next": "library",
          "feedback": ""
        },
        {
          "text": "A Wagyu cow.",
          "next": "library",
          "feedback": ""
        }
      ]
    },
    "cowRetry": {
      "ch": 3,
      "speaker": "Moonalisa",
      "title": "Answer Question",
      "loc": "Moo Class",
      "narration": "",
      "line": "“This friend has no milk to share today. But they told me Moonalisa might be able to help.”",
      "image": "/media/88d45b0a-2850-49f4-993e-387b8498ba30",
      "imageAlt": "Yiwen meets Moonalisa beside the moonlit Milk River.",
      "choices": [
        {
          "text": "Talk to Moonalisa",
          "next": "milkWin",
          "feedback": ""
        }
      ]
    },
    "milkWin": {
      "ch": 3,
      "speaker": "Yiwen",
      "title": "Best milk for bubble tea",
      "loc": "Moo Class",
      "narration": "Only after proving that she truly understands and appreciates milk does Moolalisa finally hand over a bottle.",
      "line": "Who knew getting milk could be this hard?",
      "image": "/media/d6febe31-f41d-47a5-91f1-2ee40b9c681d",
      "imageAlt": "Yiwen meets Moonalisa beside the moonlit Milk River.",
      "choices": [
        {
          "text": "New choice",
          "next": "maple",
          "feedback": "",
          "item": "milk"
        }
      ]
    },
    "maple": {
      "ch": 4,
      "speaker": "Maple Syrup",
      "title": "An unexpected neighbor",
      "loc": "The maple path home",
      "narration": "A spirit in a splendid maple-leaf hat waves from the roadside.",
      "line": "“Hello, traveler!”\nYour new neighbor seems a little shy. Shall we stop for a chat?",
      "image": "/media/b2ff5a0c-a059-4945-b126-2830c72f6394",
      "imageAlt": "Yiwen meets a maple spirit along an autumn garden path.",
      "choices": [
        {
          "text": "Walk over and say, “Hello!”",
          "next": "smallTalk",
          "feedback": ""
        },
        {
          "text": "Wave and continue home",
          "next": "mapleBye",
          "feedback": ""
        }
      ]
    },
    "smallTalk": {
      "ch": 4,
      "speaker": "Maple Syrup",
      "title": "It starts with a hello",
      "loc": "Maple Syrup’s garden",
      "narration": "",
      "line": "“How are you?”",
      "image": "/media/5b84a660-fb8d-49c6-92b3-e52d62e764e4",
      "imageAlt": "Yiwen meets a maple spirit along an autumn garden path.",
      "choices": [
        {
          "text": "“I’m fine, thank you. And you?”",
          "next": "smallTalk2",
          "feedback": "“I’m fine too. Thanks for asking!”"
        },
        {
          "text": "“I’m tired.”",
          "next": "mapleBye",
          "feedback": "“A long journey? Rest here for a moment.”"
        },
        {
          "text": "“I’m good. How about you?”",
          "next": "smallTalk2",
          "feedback": "“I’m good! It’s nice to meet someone new.”"
        }
      ]
    },
    "smallTalk2": {
      "ch": 4,
      "speaker": "Maple Syrup",
      "title": "A little closer",
      "loc": "Maple Syrup’s garden",
      "narration": "",
      "line": "“How was your day?”",
      "image": "/media/c966ac4f-7058-4952-8df0-32d274f3ba43",
      "imageAlt": "Yiwen meets a maple spirit along an autumn garden path.",
      "choices": [
        {
          "text": "“Not bad.”",
          "next": "mapleBye",
          "feedback": ""
        },
        {
          "text": "“Not bad, and you?”",
          "next": "mapleBye",
          "feedback": ""
        },
        {
          "text": "“Good! I like your outfit! :)”",
          "next": "mapleWin",
          "feedback": "Maple syrup collected · A sweet gift for a kind compliment.",
          "item": "maple"
        }
      ]
    },
    "mapleBye": {
      "ch": 4,
      "speaker": "Maple Syrup",
      "title": "Even a little hello feels warm",
      "loc": "The maple path at sunset",
      "narration": "",
      "line": "“It was nice talking to you. See you around!”",
      "image": "/media/9d24c777-dc48-48de-8b36-dc3088d88b55",
      "imageAlt": "Yiwen meets a maple spirit along an autumn garden path.",
      "choices": [
        {
          "text": "See you soon! Head home",
          "next": "finish",
          "feedback": ""
        }
      ]
    },
    "mapleWin": {
      "ch": 4,
      "speaker": "Maple Syrup",
      "title": "The sweetness of somewhere new",
      "loc": "Maple Syrup’s garden",
      "narration": "",
      "line": "“Thank you! I made this hat myself. Here, a little maple syrup for you!”",
      "image": "/media/2af4809a-d6e9-4e6e-93b3-2c1e95b0284d",
      "imageAlt": "Yiwen meets a maple spirit along an autumn garden path.",
      "choices": [
        {
          "text": "Thank you! I’ll try a new flavor.",
          "next": "finish",
          "feedback": "",
          "item": "maple"
        }
      ]
    },
    "finish": {
      "ch": 5,
      "speaker": "Yiwen",
      "title": "Ending : My very first homemade cup",
      "loc": "Back in my little kitchen",
      "narration": "",
      "line": "“Let’s see what I brought home. It may not be everything I hoped for, but I can still make a cup of my own. Ready to give it a try?”",
      "image": "/media/e4083c63-5f85-4afe-af31-50fe08bad2f2",
      "imageAlt": "Yiwen in a cozy kitchen preparing bubble tea.",
      "choices": [
        {
          "text": "Make bubble tea with your ingredients",
          "next": "ending",
          "feedback": ""
        }
      ]
    },
    "ending": {
      "ch": 5,
      "loc": "My little kitchen, lights aglow",
      "speaker": "Yiwen",
      "end": true,
      "image": "/place-home.jpg",
      "imageAlt": "Yiwen in a cozy kitchen preparing bubble tea."
    },
    "scene_e6065a20fd5740ac8ea2541fa5df11c7": {
      "ch": 3,
      "speaker": "Moonalisa",
      "title": "Milk doesn’t come easy.",
      "loc": "Moo Class",
      "narration": "Moolalisa spends every day carefully producing and protecting the finest milk in the land. But she is frustrated that people simply drink milk without appreciating where it comes from or how much work goes into producing it. She believes people have taken milk for granted for far too long.\n\nSo she refuses to give her milk to just anyone. Anyone who wants a bottle must first pass her Milk Exam.",
      "line": "You humans drink milk like it’s water! You have no idea how hard it is to get!",
      "image": "/media/afc8244e-ce9e-4f1d-bf6a-f1e2128f8fc2",
      "choices": [
        {
          "text": "Continue",
          "next": "cows",
          "feedback": ""
        }
      ]
    },
    "scene_17d40083e1884a63ad882fb3b1f1378a": {
      "ch": 1,
      "speaker": "Tea Guardian",
      "title": "Hi, Tea Guardian",
      "loc": "The Tea Forest",
      "narration": "Yiwen arrived at the Tea Forest.\nAs she wandered deeper into the forest, she saw a  large, soft, round, pale-green guardian covered in leaves.\nIt was the Tea Guardian.\nSitting peacefully in the tea fields, the Guardian held a bundle of tea leaves in his hands. ",
      "line": "“I heard you want to make some tea. I can give you the leaves, but if you want to turn them into a hot tea base, you need to find a way to heat them up.”",
      "image": "/media/53badbf8-27ad-4863-adf4-1808c59a4e70",
      "choices": [
        {
          "text": "Try to heat leaves",
          "next": "tea",
          "feedback": ""
        }
      ]
    },
    "scene_2479e69632ba415790473813b0311828": {
      "ch": 0,
      "speaker": "Yiwen",
      "title": "Every little discovery",
      "loc": "Yiwen’s new city",
      "narration": "At first, everything fills her with excitement. She makes new friends, discovers unfamiliar cultures, and wanders down winding streets just to see where they lead. Every little discovery feeds her adventurous spirit...",
      "line": "",
      "image": "/media/1d6f64c1-fa98-4ed0-bb2b-ce3f4445ce30",
      "imageAlt": "Every little discovery — Yiwen’s adventure.",
      "type": "image",
      "choices": [
        {
          "text": "Next",
          "next": "delivery"
        }
      ]
    },
    "scene_6a3f0a9e1f28440bad574f93f73ce050": {
      "ch": 0,
      "speaker": "Yiwen",
      "title": "A familiar comfort",
      "loc": "Yiwen’s new city",
      "narration": "Before long, she starts craving one familiar comfort: bubble tea.\n\nBut there isn't a single boba shop anywhere near her new home or school.\n\nShe thinks back to high school, when a long day of studying could always be rescued by a cup of milk tea. All she had to do was place an order and wait for a delivery rider to arrive, drink in hand.",
      "line": "",
      "image": "/media/897c4557-a2c4-486b-ae18-b10ae24b9944",
      "imageAlt": "A familiar comfort — Yiwen’s adventure.",
      "type": "image",
      "choices": [
        {
          "text": "Next",
          "next": "scene_8357c7576f054c9ea666825d17b5790a"
        }
      ]
    },
    "scene_8357c7576f054c9ea666825d17b5790a": {
      "ch": 0,
      "speaker": "Yiwen",
      "title": "The delivery fee? $20,000!",
      "loc": "Yiwen’s new city",
      "narration": "“Wait,” she thinks. “Why don’t I just order some?”\n\nThen she checks the nearest shop. It sits on top of a distant mountain, surrounded by a thick bamboo forest. Deliveries come by dragon: a rider swoops down from the peak with the order.\n\nThe delivery fee?\n$20,000!",
      "line": "",
      "image": "/media/4d308084-71b4-4f74-8a31-c71a6b166fae",
      "imageAlt": "The delivery fee? $20,000! — Yiwen’s adventure.",
      "type": "image",
      "choices": [
        {
          "text": "Next",
          "next": "scene_8b9c353025de4b01b70c0be7709267a0"
        }
      ]
    },
    "scene_8b9c353025de4b01b70c0be7709267a0": {
      "ch": 0,
      "speaker": "Yiwen",
      "title": "The College of Dreamcraft & Magic",
      "loc": "CDM — College of Dreamcraft & Magic",
      "narration": "Fine. She will make it herself.\n\nThere is just one small problem: she has no idea how.\n\n“Maybe there’s a recipe in the library.”\n\nWith a new plan in mind, she heads to the library at her academy, CDM—the College of Dreamcraft & Magic.",
      "line": "",
      "image": "/media/d102bc7a-bf86-4fa4-9eda-6c96787e799c",
      "imageAlt": "The College of Dreamcraft & Magic — Yiwen’s adventure.",
      "type": "image",
      "choices": [
        {
          "text": "Next",
          "next": "library"
        }
      ]
    },
    "scene_3f127ef6a8864b0ab1de56988e279e98": {
      "ch": 0,
      "speaker": "Yiwen",
      "title": "Sounds like an adventure",
      "loc": "CDM — College of Dreamcraft & Magic",
      "narration": "“Well,” she says, a grin spreading across her face. “Sounds like an adventure.”\n\nThe thought of danger only makes her more curious.\n\n“A little adversity never stopped me.”\n\nClutching the recipe and its map, she sets off to gather the ingredients, already wondering what waits beyond the next bend.",
      "line": "",
      "image": "/media/50a86ea5-6255-4173-afff-e78ecf051c6e",
      "imageAlt": "Sounds like an adventure — Yiwen’s adventure.",
      "type": "image",
      "choices": [
        {
          "text": "Next",
          "next": "scene_17d40083e1884a63ad882fb3b1f1378a"
        }
      ]
    },
    "scene_e61c59ff977e43989640cf9db80035bf": {
      "ch": 2,
      "speaker": "Yiwen",
      "title": "A river of tapioca pearls",
      "loc": "Tapioca Pearl Land",
      "narration": "Yiwen enters a world filled with the scent of sugar. The river flows with crystal-clear black beads.",
      "line": "“Those look like... boba! Wait, what’s the ingredient called again?”",
      "image": "/media/1073854d-545a-41f2-994a-7bb9f41de209",
      "imageAlt": "A river of tapioca pearls — Yiwen’s adventure.",
      "choices": [
        {
          "text": "Continue",
          "next": "scene_23cf412ee3024fb382dcceb3a11e55f8",
          "feedback": ""
        }
      ]
    },
    "scene_23cf412ee3024fb382dcceb3a11e55f8": {
      "ch": 2,
      "speaker": "Bobo",
      "title": "It’s taaaapioca!",
      "loc": "Tapioca Pearl Land",
      "narration": "A chirpy, sugary voice rings out. A black head suddenly appears beside Yiwen. He has gleaming eyes and a friendly, excited smile. In contrast, his body seems a little squishy compared to a normal bead.",
      "line": "“It’s taaaapioca!”",
      "image": "/media/0a5d1a2d-0b0c-4b12-96a1-c30fd23161d5",
      "imageAlt": "It’s taaaapioca! — Yiwen’s adventure.",
      "choices": [
        {
          "text": "Continue",
          "next": "scene_4565b93cbe424a3aa553c3449becfadf",
          "feedback": ""
        }
      ]
    },
    "scene_10bb041541384a578d0fdecb9ce92f4b": {
      "ch": 2,
      "speaker": "Yiwen",
      "title": "Tabi...o...ka?",
      "loc": "Tapioca Pearl Land",
      "narration": "",
      "line": "“Hello, I’d like some ah- tabi...o...ka?”",
      "image": "/media/89095663-c22b-4342-a9d6-f1df5941246a",
      "imageAlt": "Tabi...o...ka? — Yiwen’s adventure.",
      "choices": [
        {
          "text": "Continue",
          "next": "scene_06f7e24555154869802717477bb93360",
          "feedback": ""
        }
      ]
    },
    "scene_0f8c9a5688a64ac0894f1cdc660b9e5e": {
      "ch": 2,
      "speaker": "Bobo",
      "title": "Welcome to Tapioca Pearl Land",
      "loc": "Tapioca Pearl Land",
      "narration": "Bobo greets his visitor with an excited smile.",
      "line": "“Yes! I’m Bobo, the guardian of Tapioca Pearl Land! Welcooome ♥”",
      "image": "/media/7106baae-3c3b-4d53-bc92-3842280be35b",
      "imageAlt": "Welcome to Tapioca Pearl Land — Yiwen’s adventure.",
      "choices": [
        {
          "text": "Continue",
          "next": "scene_bdaf4b59a2bc419483a14087cf289de1",
          "feedback": ""
        }
      ]
    },
    "scene_d18324b028e64f42b46fef1d1d948d18": {
      "ch": 2,
      "speaker": "Yiwen",
      "title": "How did you know?",
      "loc": "Tapioca Pearl Land",
      "narration": "",
      "line": "“How did you know?”",
      "image": "/media/5f0677ad-a107-49c1-8105-b923c015fbb6",
      "imageAlt": "It’s been a really long time — Yiwen and Bobo in Tapioca Pearl Land.",
      "choices": [
        {
          "text": "Continue",
          "next": "scene_42ac269cbe4e4da28f0912193b6a3ebd",
          "feedback": ""
        }
      ]
    },
    "scene_e84024157d404b64ad8b568afb7b54fa": {
      "ch": 2,
      "speaker": "Yiwen",
      "title": "I really miss bubble tea",
      "loc": "Tapioca Pearl Land",
      "narration": "",
      "line": "“Yes, I really miss bubble tea, a drink from my hometown. I need tapioca pearls to make it.”",
      "image": "/media/684d2a86-fb72-4fa0-8ae9-53b92cf2bcd7",
      "imageAlt": "I really miss bubble tea — Yiwen and Bobo in Tapioca Pearl Land.",
      "choices": [
        {
          "text": "Continue",
          "next": "scene_cfea10ee88de44eb89a9f5cbbe421dee",
          "feedback": ""
        }
      ]
    },
    "scene_11f3a8c07f0e47119fd980e05a59eb1b": {
      "ch": 2,
      "speaker": "Bobo",
      "title": "Could you do me a favor?",
      "loc": "Tapioca Pearl Land",
      "narration": "",
      "line": "“I can help you with that! But first, could you do me a favor?”",
      "image": "/media/bfffcce7-a6ab-4297-80ec-11cea1f401c0",
      "imageAlt": "Could you do me a favor? — Yiwen and Bobo in Tapioca Pearl Land.",
      "choices": [
        {
          "text": "Continue",
          "next": "scene_ad690c21f1004b03a8a653109179b0bb",
          "feedback": ""
        }
      ]
    },
    "scene_e53759c6ede347bd9de0c0efd5ee0e41": {
      "ch": 2,
      "speaker": "Bobo",
      "title": "Music from your land",
      "loc": "Tapioca Pearl Land",
      "narration": "Bobo cheers and starts to shake.",
      "line": "“Wooow! Is that... music from your land? I haven’t heard it in so long!”",
      "image": "/media/58b0b231-0a30-4786-bdba-4d45a7e93151",
      "imageAlt": "Music from your land — Yiwen and Bobo in Tapioca Pearl Land.",
      "choices": [
        {
          "text": "Continue",
          "next": "scene_b0d9900c8e064df3af3bed3c83aa3213",
          "feedback": ""
        }
      ]
    },
    "scene_b0d9900c8e064df3af3bed3c83aa3213": {
      "ch": 2,
      "speaker": "Yiwen",
      "title": "They sing and dance all day",
      "loc": "Tapioca Pearl Land",
      "narration": "Seeing Bobo so happy, Yiwen can’t stop smiling and joins him.\n\nThey sing and dance all day, unable to stop.",
      "line": "",
      "image": "/media/193f4919-c3d6-488d-a4bf-86ed4f020d5e",
      "imageAlt": "They sing and dance all day — Yiwen and Bobo in Tapioca Pearl Land.",
      "type": "image",
      "choices": [
        {
          "text": "Next",
          "next": "scene_9c851452c247424581d690a25bd94c24"
        }
      ]
    },
    "scene_9c851452c247424581d690a25bd94c24": {
      "ch": 2,
      "speaker": "Bobo",
      "title": "That was a really fun day!",
      "loc": "Tapioca Pearl Land",
      "narration": "That night, Bobo throws his arms into the air, his voice bouncing faintly inside him.",
      "line": "“OOOH! THAT WAS A REALLY FUN DAY!”",
      "image": "/media/a5cccc83-c95b-4154-bc7f-ba500ff22053",
      "imageAlt": "That was a really fun day! — Yiwen and Bobo in Tapioca Pearl Land.",
      "choices": [
        {
          "text": "Continue",
          "next": "boboMusic",
          "feedback": ""
        }
      ]
    },
    "scene_e8de716fc3ae4d4a934cdb2ef3f1942d": {
      "ch": 2,
      "speaker": "Bobo",
      "title": "A promise kept",
      "loc": "Tapioca Pearl Land",
      "narration": "They stare at each other, somewhere between laughing and crying.",
      "line": "“Well, that’s the most fun I’ve had in a long time. I still really appreciate it.”",
      "image": "/media/c2b10dce-7cbd-4e53-9839-11a5b34c6d32",
      "imageAlt": "A promise kept — Yiwen and Bobo in Tapioca Pearl Land.",
      "choices": [
        {
          "text": "Continue",
          "next": "scene_46914da3588643e9b5fda7b46b4fdff1",
          "feedback": ""
        }
      ]
    },
    "scene_740857d84c414a99b75884db186c1806": {
      "ch": 2,
      "speaker": "Yiwen",
      "title": "Tapioca pearls, a little too firm",
      "loc": "Tapioca Pearl Land",
      "narration": "Yiwen receives the ingredient—Tapioca Pearls—but they aren’t bouncy enough.",
      "line": "",
      "image": "/media/c9d19433-e31b-4dda-ad90-b23332c419c5",
      "imageAlt": "Tapioca pearls, a little too firm — Yiwen and Bobo in Tapioca Pearl Land.",
      "type": "image",
      "choices": [
        {
          "text": "Next",
          "next": "scene_f3352b2ed5fc428b8dec553838f5c43a"
        }
      ]
    },
    "scene_aa85607371ff490fbdbd44f18ca27000": {
      "ch": 2,
      "speaker": "Yiwen",
      "title": "Maybe a few gentle smacks?",
      "loc": "Tapioca Pearl Land",
      "narration": "",
      "line": "“Hmm... I’ve seen people slap dough around when they’re making it. Maybe if I give you a few smacks, you’ll get bouncier?”",
      "image": "/media/005311b1-6139-47c7-9763-ff4574d6cd49",
      "imageAlt": "Maybe a few gentle smacks? — Yiwen and Bobo in Tapioca Pearl Land.",
      "choices": [
        {
          "text": "Continue",
          "next": "scene_a3092930b83146e19536fe823f6c0132",
          "feedback": ""
        }
      ]
    },
    "scene_a3092930b83146e19536fe823f6c0132": {
      "ch": 2,
      "speaker": "Bobo",
      "title": "Will it hurt?",
      "loc": "Tapioca Pearl Land",
      "narration": "Bobo looks slightly scared.",
      "line": "“Huh? Will it hurt?”",
      "image": "/media/5770ce5d-c611-4ef5-b9b6-bb24ca579ab5",
      "imageAlt": "I’ll be gentle — Yiwen and Bobo in Tapioca Pearl Land.",
      "choices": [
        {
          "text": "Continue",
          "next": "scene_b20ed87cb4864fe995b51552112677cf",
          "feedback": ""
        }
      ]
    },
    "scene_1566a47c10064b46ac79f09a400df347": {
      "ch": 2,
      "speaker": "Yiwen",
      "title": "A few careful bounces",
      "loc": "Tapioca Pearl Land",
      "narration": "Yiwen picks Bobo up and starts bouncing him against the ground like a basketball.\n\nAt first, she goes slowly, with long pauses between each bounce.\n\nBut to her surprise, Bobo doesn’t seem to be in pain at all. In fact, he is having fun—and getting more excited with every bounce.",
      "line": "",
      "image": "/media/74c2a864-ef1c-4ed3-8a81-10c3d440da10",
      "imageAlt": "A few careful bounces — Yiwen and Bobo in Tapioca Pearl Land.",
      "type": "image",
      "choices": [
        {
          "text": "Next",
          "next": "scene_9ff16600e91944e48082e996099886cd"
        }
      ]
    },
    "scene_9ff16600e91944e48082e996099886cd": {
      "ch": 2,
      "speaker": "Yiwen",
      "title": "Faster and faster",
      "loc": "Tapioca Pearl Land",
      "narration": "Seeing how much Bobo is enjoying it, Yiwen begins bouncing him faster and faster.\n\nAfter a round of dribbling, Yiwen is exhausted, but Bobo is full of excitement.",
      "line": "",
      "image": "/media/9b59187d-3b45-4d05-ae12-8fb5e63e386a",
      "imageAlt": "Faster and faster — Yiwen and Bobo in Tapioca Pearl Land.",
      "type": "image",
      "choices": [
        {
          "text": "Next",
          "next": "boboWin"
        }
      ]
    },
    "scene_5e07cd8486314e53b5a9b8e18aed5238": {
      "ch": 2,
      "speaker": "Yiwen",
      "title": "Tapioca pearls with the perfect bounce",
      "loc": "Tapioca Pearl Land",
      "narration": "Yiwen receives the ingredient—Tapioca Pearls—with the perfect bounce.",
      "line": "",
      "image": "/media/e7944156-df02-46ff-a5c6-7c4fb69b6739",
      "imageAlt": "Tapioca pearls with the perfect bounce — Yiwen and Bobo in Tapioca Pearl Land.",
      "type": "image",
      "choices": [
        {
          "text": "Next",
          "next": "scene_f3352b2ed5fc428b8dec553838f5c43a"
        }
      ]
    },
    "scene_e909cf7d97914b7e8db8c530312de493": {
      "ch": 2,
      "speaker": "Yiwen",
      "title": "How about a little air?",
      "loc": "Tapioca Pearl Land",
      "narration": "",
      "line": "“Your body looks a little deflated. How about... I pump some air into you?”",
      "image": "/media/1764e3e1-b6fe-4f83-ab3e-afc51b318086",
      "imageAlt": "How about a little air? — Yiwen and Bobo in Tapioca Pearl Land.",
      "choices": [
        {
          "text": "Continue",
          "next": "scene_e86e3d12b5cf4129a8c562650c6e2540",
          "feedback": ""
        }
      ]
    },
    "scene_e86e3d12b5cf4129a8c562650c6e2540": {
      "ch": 2,
      "speaker": "Bobo",
      "title": "Let’s do it!",
      "loc": "Tapioca Pearl Land",
      "narration": "",
      "line": "“Okay, I’ve never tried that before. Let’s do it!”",
      "image": "/media/c855c018-5bd2-43c2-b3cb-b0b63a3a9707",
      "imageAlt": "Let’s do it! — Yiwen and Bobo in Tapioca Pearl Land.",
      "choices": [
        {
          "text": "Continue",
          "next": "scene_af94080fbffe44b5bc6074965954ce81",
          "feedback": ""
        }
      ]
    },
    "scene_af94080fbffe44b5bc6074965954ce81": {
      "ch": 2,
      "speaker": "Yiwen",
      "title": "A syringe made from branches",
      "loc": "Tapioca Pearl Land",
      "narration": "Yiwen spends two hours making a syringe out of branches. Then she pushes it into Bobo’s body and slams the plunger down with all her might, pumping air into him.",
      "line": "",
      "image": "/media/71096589-0efb-48d4-b119-580b9aa7d01b",
      "imageAlt": "A syringe made from branches — Yiwen and Bobo in Tapioca Pearl Land.",
      "type": "image",
      "choices": [
        {
          "text": "Next",
          "next": "scene_76db640df70f4c6aac44e53760c32b0d"
        }
      ]
    },
    "scene_76db640df70f4c6aac44e53760c32b0d": {
      "ch": 2,
      "speaker": "Yiwen",
      "title": "Oh! It works!",
      "loc": "Tapioca Pearl Land",
      "narration": "Bobo starts to puff up, his body growing round and plump again.\n\nSeeing how well it is working, Yiwen gets excited and pushes even harder.",
      "line": "“Oh! It works!”",
      "image": "/media/0b8dd7f0-3655-455e-a6a7-c00db9a4faa3",
      "imageAlt": "Oh! It works! — Yiwen and Bobo in Tapioca Pearl Land.",
      "choices": [
        {
          "text": "Continue",
          "next": "boboAir",
          "feedback": ""
        }
      ]
    },
    "scene_8e432f7d4f0e4b1da2c0f139d77513eb": {
      "ch": 2,
      "speaker": "Yiwen",
      "title": "No tapioca pearls this time",
      "loc": "Tapioca Pearl Land",
      "narration": "Yiwen shouts after him, but within seconds, Bobo disappears from sight.\n\nYiwen doesn’t receive the ingredient—Tapioca Pearls.\n\nShe continues her journey.",
      "line": "",
      "image": "/media/a66f9c69-ebdd-41d4-9dc6-d90439bf1e72",
      "imageAlt": "No tapioca pearls this time — Yiwen and Bobo in Tapioca Pearl Land.",
      "type": "image",
      "choices": [
        {
          "text": "Next",
          "next": "milk"
        }
      ]
    },
    "scene_f3352b2ed5fc428b8dec553838f5c43a": {
      "ch": 2,
      "speaker": "Yiwen",
      "title": "Onward to the next land",
      "loc": "Tapioca Pearl Land",
      "narration": "Yiwen bids Bobo farewell and continues her journey.",
      "line": "",
      "image": "/media/0810b10c-8276-4c33-878c-1a865f63bb75",
      "imageAlt": "Onward to the next land — Yiwen and Bobo in Tapioca Pearl Land.",
      "type": "image",
      "choices": [
        {
          "text": "Next",
          "next": "milk"
        }
      ]
    },
    "scene_bc67edcaa3f646d48a085dd5f1087ad4": {
      "ch": 2,
      "speaker": "Yiwen",
      "title": "Another path ahead",
      "loc": "Tapioca Pearl Land",
      "narration": "Yiwen skips the tapioca challenge and continues her journey.",
      "line": "",
      "image": "/media/d7f5d222-65e0-4bb4-93b7-82a6f50ed765",
      "imageAlt": "Another path ahead — Yiwen and Bobo in Tapioca Pearl Land.",
      "type": "image",
      "choices": [
        {
          "text": "Next",
          "next": "milk"
        }
      ]
    },
    "scene_4565b93cbe424a3aa553c3449becfadf": {
      "ch": 2,
      "speaker": "Bobo",
      "title": "Hiii, stranger! What brings you here?",
      "loc": "Tapioca Pearl Land",
      "narration": "",
      "line": "“Hiii, stranger! What brings you here?”",
      "image": "/media/3e836114-8e7a-4a7b-b9a2-b62face9b6a2",
      "imageAlt": "Hiii, stranger! What brings you here? — Yiwen and Bobo in Tapioca Pearl Land.",
      "choices": [
        {
          "text": "Continue",
          "next": "scene_10bb041541384a578d0fdecb9ce92f4b",
          "feedback": ""
        }
      ]
    },
    "scene_06f7e24555154869802717477bb93360": {
      "ch": 2,
      "speaker": "Bobo",
      "title": "Tapioca! You want some tapioca pearls?",
      "loc": "Tapioca Pearl Land",
      "narration": "",
      "line": "“Tapioca! You want some tapioca pearls?”",
      "image": "/media/f54e39e6-73f0-44a5-849a-03b15d91fe43",
      "imageAlt": "Tapioca! You want some tapioca pearls? — Yiwen and Bobo in Tapioca Pearl Land.",
      "choices": [
        {
          "text": "Continue",
          "next": "scene_4f3cc6ee40f94625baba19f2dd08db59",
          "feedback": ""
        }
      ]
    },
    "scene_4f3cc6ee40f94625baba19f2dd08db59": {
      "ch": 2,
      "speaker": "Yiwen",
      "title": "That’s it! And... I’m Yiwen. What’s your name?",
      "loc": "Tapioca Pearl Land",
      "narration": "",
      "line": "“That’s it! And... I’m Yiwen. What’s your name?”",
      "image": "/media/2aa32056-1f03-481d-83f8-e0ebdcf540ad",
      "imageAlt": "That’s it! And... I’m Yiwen. What’s your name? — Yiwen and Bobo in Tapioca Pearl Land.",
      "choices": [
        {
          "text": "Continue",
          "next": "scene_0f8c9a5688a64ac0894f1cdc660b9e5e",
          "feedback": ""
        }
      ]
    },
    "scene_bdaf4b59a2bc419483a14087cf289de1": {
      "ch": 2,
      "speaker": "Bobo",
      "title": "You must be from another world, right?",
      "loc": "Tapioca Pearl Land",
      "narration": "",
      "line": "“You must be from another world, right?”",
      "image": "/media/4394b81c-58a5-4aa2-ad84-6485f93b8e99",
      "imageAlt": "You must be from another world, right? — Yiwen and Bobo in Tapioca Pearl Land.",
      "choices": [
        {
          "text": "Continue",
          "next": "scene_d18324b028e64f42b46fef1d1d948d18",
          "feedback": ""
        }
      ]
    },
    "scene_42ac269cbe4e4da28f0912193b6a3ebd": {
      "ch": 2,
      "speaker": "Bobo",
      "title": "Haha, it’s been a really long time since we’ve had any visitors.",
      "loc": "Tapioca Pearl Land",
      "narration": "The light in Bobo’s eyes dims slightly.",
      "line": "“Haha, it’s been a really long time since we’ve had any visitors.”",
      "image": "/media/8fdcc8b3-e963-4f2c-a24d-e81d984622c3",
      "imageAlt": "Haha, it’s been a really long time since we’ve had any visitors. — Yiwen and Bobo in Tapioca Pearl Land.",
      "choices": [
        {
          "text": "Continue",
          "next": "scene_4346378a605743408c34b389a4236113",
          "feedback": ""
        }
      ]
    },
    "scene_4346378a605743408c34b389a4236113": {
      "ch": 2,
      "speaker": "Bobo",
      "title": "Tapioca pearls in this world",
      "loc": "Tapioca Pearl Land",
      "narration": "",
      "line": "“People in this world hardly ever use tapioca pearls, unlike people in other worlds.”",
      "image": "/media/87de439b-647b-4dab-aa9f-6519087501d3",
      "imageAlt": "Tapioca pearls in this world — Yiwen and Bobo in Tapioca Pearl Land.",
      "choices": [
        {
          "text": "Continue",
          "next": "scene_e84024157d404b64ad8b568afb7b54fa",
          "feedback": ""
        }
      ]
    },
    "scene_cfea10ee88de44eb89a9f5cbbe421dee": {
      "ch": 2,
      "speaker": "Bobo",
      "title": "Ohhh, boba! I love boba!",
      "loc": "Tapioca Pearl Land",
      "narration": "Bobo instantly springs up, clapping.",
      "line": "“Ohhh, boba! I love boba!”",
      "image": "/media/535c1320-7d78-4926-8b2b-65da867399c7",
      "imageAlt": "Ohhh, boba! I love boba! — Yiwen and Bobo in Tapioca Pearl Land.",
      "choices": [
        {
          "text": "Continue",
          "next": "scene_be8577d073604e4398662cf1fbab4ee7",
          "feedback": ""
        }
      ]
    },
    "scene_be8577d073604e4398662cf1fbab4ee7": {
      "ch": 2,
      "speaker": "Bobo",
      "title": "It tastes perfect with milk tea!",
      "loc": "Tapioca Pearl Land",
      "narration": "",
      "line": "“It tastes perfect with milk tea!”",
      "image": "/media/345d29a8-a649-4799-a644-898fc8407c93",
      "imageAlt": "It tastes perfect with milk tea! — Yiwen and Bobo in Tapioca Pearl Land.",
      "choices": [
        {
          "text": "Continue",
          "next": "scene_11f3a8c07f0e47119fd980e05a59eb1b",
          "feedback": ""
        }
      ]
    },
    "scene_ad690c21f1004b03a8a653109179b0bb": {
      "ch": 2,
      "speaker": "Yiwen",
      "title": "Sure! What is it?",
      "loc": "Tapioca Pearl Land",
      "narration": "Yiwen’s eyes go wide.",
      "line": "“Sure! What is it?”",
      "image": "/media/1992529c-a29d-4ce9-ae21-40367e351082",
      "imageAlt": "Sure! What is it? — Yiwen and Bobo in Tapioca Pearl Land.",
      "choices": [
        {
          "text": "Continue",
          "next": "scene_2e2c1d1fc086460e8f6ef4e40a0463c0",
          "feedback": ""
        }
      ]
    },
    "scene_2e2c1d1fc086460e8f6ef4e40a0463c0": {
      "ch": 2,
      "speaker": "Bobo",
      "title": "I’ve lost my bounce",
      "loc": "Tapioca Pearl Land",
      "narration": "Bobo gives his slightly deflated body a little squeeze.",
      "line": "“No one has played with me in a really long time, so I’ve lost my bounce.”",
      "image": "/media/c4ea3bae-d9ac-4e24-b5b7-99a860ab6d59",
      "imageAlt": "I’ve lost my bounce — Yiwen and Bobo in Tapioca Pearl Land.",
      "choices": [
        {
          "text": "Continue",
          "next": "scene_eb76870afbee4b1b8fd447c3f0b48149",
          "feedback": ""
        }
      ]
    },
    "scene_eb76870afbee4b1b8fd447c3f0b48149": {
      "ch": 2,
      "speaker": "Bobo",
      "title": "As many pearls as you want",
      "loc": "Tapioca Pearl Land",
      "narration": "",
      "line": "“If you help me get bouncy again, I’ll give you as many pearls as you want!”",
      "image": "/media/613dbb2f-a45b-4993-ab9b-4fd10521fe89",
      "imageAlt": "As many pearls as you want — Yiwen and Bobo in Tapioca Pearl Land.",
      "choices": [
        {
          "text": "Help Bobo get his bounce back",
          "next": "bobo",
          "feedback": ""
        },
        {
          "text": "Skip the tapioca challenge and continue",
          "next": "scene_bc67edcaa3f646d48a085dd5f1087ad4",
          "feedback": ""
        }
      ]
    },
    "scene_46914da3588643e9b5fda7b46b4fdff1": {
      "ch": 2,
      "speaker": "Bobo",
      "title": "Maybe boil them a little longer",
      "loc": "Tapioca Pearl Land",
      "narration": "Bobo wants to keep his promise. He offers Yiwen a bag of tapioca pearls.",
      "line": "“They’re kinda firm. Maybe boiling them a little longer would help.”",
      "image": "/media/4514e3ad-34aa-4856-a06d-607685623092",
      "imageAlt": "Maybe boil them a little longer — Yiwen and Bobo in Tapioca Pearl Land.",
      "choices": [
        {
          "text": "Accept the tapioca pearls",
          "next": "scene_740857d84c414a99b75884db186c1806",
          "feedback": "Tapioca Pearls received — but they aren’t bouncy enough.",
          "item": "boba"
        }
      ]
    },
    "scene_b20ed87cb4864fe995b51552112677cf": {
      "ch": 2,
      "speaker": "Yiwen",
      "title": "I’ll be gentle.",
      "loc": "Tapioca Pearl Land",
      "narration": "",
      "line": "“I’ll be gentle.”",
      "image": "/media/5fd8d997-3345-40aa-b5e2-609969277a3b",
      "imageAlt": "I’ll be gentle. — Yiwen and Bobo in Tapioca Pearl Land.",
      "choices": [
        {
          "text": "Continue",
          "next": "scene_1566a47c10064b46ac79f09a400df347",
          "feedback": ""
        }
      ]
    },
    "scene_da171575e39440fcbd0b1d2b731d75e3": {
      "ch": 2,
      "speaker": "Bobo",
      "title": "I feel like a teenager again!",
      "loc": "Tapioca Pearl Land",
      "narration": "",
      "line": "“I feel like a teenager again!”",
      "image": "/media/34223c11-e001-4b6c-bd92-d40048e7956b",
      "imageAlt": "I feel like a teenager again! — Yiwen and Bobo in Tapioca Pearl Land.",
      "choices": [
        {
          "text": "Accept the perfectly bouncy tapioca pearls",
          "next": "scene_5e07cd8486314e53b5a9b8e18aed5238",
          "feedback": "Tapioca Pearls received — with the perfect bounce.",
          "item": "boba"
        }
      ]
    },
    "scene_a96d4411561844899b60d6a556109067": {
      "ch": 2,
      "speaker": "Yiwen",
      "title": "BOBO! BO—BOOO—!",
      "loc": "Tapioca Pearl Land",
      "narration": "Suddenly, Bobo swells like a balloon and shoots into the air, rising higher and higher toward space.",
      "line": "“BOBO! BO—BOOO—!”",
      "image": "/media/b0cb68ac-952d-49de-bf36-eff6090963ab",
      "imageAlt": "BOBO! BO—BOOO—! — Yiwen and Bobo in Tapioca Pearl Land.",
      "choices": [
        {
          "text": "Continue",
          "next": "scene_8e432f7d4f0e4b1da2c0f139d77513eb",
          "feedback": ""
        }
      ]
    },
    "scene_9634fffd222c4e74958ef0732ebb5450": {
      "ch": 5,
      "speaker": "Yiwen",
      "title": "Ending : A different taste, without boba",
      "loc": "My little kitchen, lights aglow",
      "narration": "ENDING · Between Old and New",
      "line": "“No boba this time, but the tea, milk, and maple syrup still make a lovely cup. It’s different from what I remember, yet every sip carries a little warmth from the friends I’ve met.”",
      "image": "/media/854f8a04-cbd5-4113-898b-029e657e0e8f",
      "end": true
    }
  },
  "endings": {
    "maple": {
      "ch": 5,
      "speaker": "Yiwen",
      "title": "Home is a flavor we make",
      "loc": "My little kitchen, lights aglow",
      "narration": "ENDING · A New Taste of Home",
      "line": "“Tea, boba, and milk—at last, a cup that reminds me of home. The tea holds my courage, the boba holds Bobo’s laughter, and the milk reminds me of everything I learned. Home is a flavor I can make, wherever I am.”",
      "image": "/media/d8f7666f-8a78-4c65-b05f-d844a8d2d5fa",
      "imageAlt": "Yiwen in a cozy kitchen preparing bubble tea.",
      "end": true
    },
    "clear": {
      "ch": 5,
      "speaker": "Yiwen",
      "title": "Ending : A little less, something new",
      "loc": "My little kitchen, lights aglow",
      "narration": "ENDING · A Fresh Start",
      "line": "“I didn’t find everything I hoped for, but this cup is still mine. Different doesn’t mean I got it wrong. I’ve found another flavor to love in this new place. I wonder what my next cup will taste like?”",
      "image": "/media/edfd56b3-1456-47a0-9618-dddbc2c9c7b1",
      "imageAlt": "Yiwen in a cozy kitchen preparing bubble tea.",
      "end": true
    },
    "classic": {
      "ch": 5,
      "speaker": "Yiwen",
      "title": "Ending : A different taste, a familiar warmth",
      "loc": "My little kitchen, lights aglow",
      "narration": "ENDING · Between Old and New",
      "line": "“Tea, boba, milk, and a little maple syrup—a familiar cup with something new. That maple sweetness reminds me of a new friend’s kindness. It tastes different from home, but the warmth is familiar. This is my own little sip of home.”",
      "image": "/media/c0d34938-483c-478e-a02e-5e2fd6bcc69d",
      "imageAlt": "Yiwen in a cozy kitchen preparing bubble tea.",
      "end": true
    }
  },
  "sceneOrder": [
    "nodes:start",
    "nodes:scene_2479e69632ba415790473813b0311828",
    "nodes:delivery",
    "nodes:scene_6a3f0a9e1f28440bad574f93f73ce050",
    "nodes:scene_8357c7576f054c9ea666825d17b5790a",
    "nodes:scene_8b9c353025de4b01b70c0be7709267a0",
    "nodes:library",
    "nodes:scene_3f127ef6a8864b0ab1de56988e279e98",
    "nodes:scene_17d40083e1884a63ad882fb3b1f1378a",
    "nodes:tea",
    "nodes:teaRetry",
    "nodes:teaWin",
    "nodes:scene_e61c59ff977e43989640cf9db80035bf",
    "nodes:scene_23cf412ee3024fb382dcceb3a11e55f8",
    "nodes:scene_4565b93cbe424a3aa553c3449becfadf",
    "nodes:scene_10bb041541384a578d0fdecb9ce92f4b",
    "nodes:scene_06f7e24555154869802717477bb93360",
    "nodes:scene_4f3cc6ee40f94625baba19f2dd08db59",
    "nodes:scene_0f8c9a5688a64ac0894f1cdc660b9e5e",
    "nodes:scene_bdaf4b59a2bc419483a14087cf289de1",
    "nodes:scene_d18324b028e64f42b46fef1d1d948d18",
    "nodes:scene_42ac269cbe4e4da28f0912193b6a3ebd",
    "nodes:scene_4346378a605743408c34b389a4236113",
    "nodes:scene_e84024157d404b64ad8b568afb7b54fa",
    "nodes:scene_cfea10ee88de44eb89a9f5cbbe421dee",
    "nodes:scene_be8577d073604e4398662cf1fbab4ee7",
    "nodes:scene_11f3a8c07f0e47119fd980e05a59eb1b",
    "nodes:scene_ad690c21f1004b03a8a653109179b0bb",
    "nodes:scene_2e2c1d1fc086460e8f6ef4e40a0463c0",
    "nodes:scene_eb76870afbee4b1b8fd447c3f0b48149",
    "nodes:bobo",
    "nodes:scene_e53759c6ede347bd9de0c0efd5ee0e41",
    "nodes:scene_b0d9900c8e064df3af3bed3c83aa3213",
    "nodes:scene_9c851452c247424581d690a25bd94c24",
    "nodes:boboMusic",
    "nodes:scene_e8de716fc3ae4d4a934cdb2ef3f1942d",
    "nodes:scene_46914da3588643e9b5fda7b46b4fdff1",
    "nodes:scene_740857d84c414a99b75884db186c1806",
    "nodes:scene_aa85607371ff490fbdbd44f18ca27000",
    "nodes:scene_a3092930b83146e19536fe823f6c0132",
    "nodes:scene_b20ed87cb4864fe995b51552112677cf",
    "nodes:scene_1566a47c10064b46ac79f09a400df347",
    "nodes:scene_9ff16600e91944e48082e996099886cd",
    "nodes:boboWin",
    "nodes:scene_da171575e39440fcbd0b1d2b731d75e3",
    "nodes:scene_5e07cd8486314e53b5a9b8e18aed5238",
    "nodes:scene_e909cf7d97914b7e8db8c530312de493",
    "nodes:scene_e86e3d12b5cf4129a8c562650c6e2540",
    "nodes:scene_af94080fbffe44b5bc6074965954ce81",
    "nodes:scene_76db640df70f4c6aac44e53760c32b0d",
    "nodes:boboAir",
    "nodes:scene_a96d4411561844899b60d6a556109067",
    "nodes:scene_8e432f7d4f0e4b1da2c0f139d77513eb",
    "nodes:scene_f3352b2ed5fc428b8dec553838f5c43a",
    "nodes:scene_bc67edcaa3f646d48a085dd5f1087ad4",
    "nodes:milk",
    "nodes:scene_e6065a20fd5740ac8ea2541fa5df11c7",
    "nodes:cows",
    "nodes:cowRetry",
    "nodes:milkWin",
    "nodes:maple",
    "nodes:smallTalk",
    "nodes:smallTalk2",
    "nodes:mapleBye",
    "nodes:mapleWin",
    "nodes:finish",
    "endings:maple",
    "endings:clear",
    "endings:classic",
    "nodes:scene_9634fffd222c4e74958ef0732ebb5450"
  ]
}
;
