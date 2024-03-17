statusofmodel = "";
objects =[];
function preload()
{
    img=loadImage("gaming.jpg");
}
function setup()
{
    canvas = createCanvas(640,360);
    canvas.center();

    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById('status').innerHTML="Status : Detecting Objects";
}
function modelLoaded()
{
    console.log("Model Loaded!");
    statusofmodel=true;
    objectDetector.detect(img,gotResults);
}
function gotResults(error,results)
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        objects=results;
    }
}
function draw()
{
    image(img,0,0,640,360);
    if(statusofmodel != "")
    {
        for (i = 0; i < objects.length; i++) {
            document.getElementById('status').innerHTML="Status : Detected Objects";
            fill("red");
            percentage=floor(objects[i].confidence * 100);
            text(objects[i].label+" " + percentage + "%", objects[i].x,objects[i].y);
            noFill();
            stroke("red");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
        document.getElementById('objects').innerHTML="Number of Objects = "+objects.length;
    }
}
