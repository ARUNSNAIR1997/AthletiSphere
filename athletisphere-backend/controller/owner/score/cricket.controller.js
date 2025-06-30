const cricketModel = require("../../../model/owner/score/cricket.model")

var path = require("path");



exports.cricketInsert = async (req, res) => {
  try {

    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    const firstTeamLogo = req.files.first_team_logo;
    const secondTeamLogo = req.files.second_team_logo;

    if (!firstTeamLogo || !secondTeamLogo) {
      return res.status(400).json({ error: "Both team logos are required" });
    }

    const file1 = firstTeamLogo.name;
    const file2 = secondTeamLogo.name;

    const uploadPath1 = path.join(__dirname, "../../public/img/" + file1);
    const uploadPath2 = path.join(__dirname, "../../public/img/" + file2);

    // Move both files
    firstTeamLogo.mv(uploadPath1, (err1) => {

      secondTeamLogo.mv(uploadPath2, async (err2) => {


        const params = {
          owner: req.body.owner,
          sports: req.body.sports,
          video: req.body.video,
          first_team_name: req.body.first_team_name,
          first_team_logo: file1,
          score: req.body.score,
          second_team_name: req.body.second_team_name,
          second_team_logo: file2,
          over: req.body.over,
          ball: req.body.ball,
          wicket: req.body.wicket
        };

        try {
          const result = await cricketModel.create(params);
            console.log("Inserted football record:", result); // ✅ log it
            res.json(result);

        } catch (dbErr) {
          res.status(500).json({ error: "Failed to insert into database" });
        }
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};





exports.cricketView = async(req,res)=>{
    try{
        const matchID = req.params.matchId;
        const view = await cricketModel.findById(matchID)
        res.json(view)
    }catch(err){
        console.error(err);
        
    }
}




exports.cricketUpdate = async (req, res) => {
  try {
    const {
      id,
      video,
      first_team_name,
      score,
      second_team_name,
      wicket,
      over,
      ball,
      existingFirst_team_logo,
      existingSecond_team_logo,
    } = req.body;

    const firstTeamLogoFile = req.files?.first_team_logo;
    const secondTeamLogoFile = req.files?.second_team_logo;

    let firstLogoName = existingFirst_team_logo;
    let secondLogoName = existingSecond_team_logo;

    // Upload First Team Logo if present
    if (firstTeamLogoFile) {
      firstLogoName = firstTeamLogoFile.name;
      const uploadPath1 = path.join(__dirname, "../../public/img/" + firstLogoName);
      await firstTeamLogoFile.mv(uploadPath1);
    }

    // Upload Second Team Logo if present
    if (secondTeamLogoFile) {
      secondLogoName = secondTeamLogoFile.name;
      const uploadPath2 = path.join(__dirname, "../../public/img/" + secondLogoName);
      await secondTeamLogoFile.mv(uploadPath2);
    }

    const updateData = {
      video,
      first_team_name,
      first_team_logo: firstLogoName,
      score,
      wicket,
      over,
      ball,
      second_team_name,
      second_team_logo: secondLogoName,
    };

    const updatedMatch = await cricketModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedMatch) {
      return res.status(404).json({ error: "Match not found" });
    }

    res.json(updatedMatch);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Server error" });
  }
};




//user view
exports.userCricketView = async(req,res)=>{
    try{
      const ownerId = req.query.owner;
        let view = await cricketModel.find({owner: ownerId})
        res.json(view)
    }catch(err){
        console.error(err);
        
    }
}