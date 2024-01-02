<?php
session_start();

if(@$_SESSION['admin_id']=='')
{
  header('location:index.php');
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
<title>Matrix Admin</title>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link rel="stylesheet" href="css/bootstrap.min.css" />
<link rel="stylesheet" href="css/bootstrap-responsive.min.css" />
<link rel="stylesheet" href="css/fullcalendar.css" />
<link rel="stylesheet" href="css/matrix-style.css" />
<link rel="stylesheet" href="css/matrix-media.css" />
<link href="font-awesome/css/font-awesome.css" rel="stylesheet" />
<link rel="stylesheet" href="css/jquery.gritter.css" />
<link href='http://fonts.googleapis.com/css?family=Open+Sans:400,700,800' rel='stylesheet' type='text/css'>
  
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>
<body>

<!--Header-part-->
<div id="header">
  <h1><a href="dashboard.html">Matrix Admin</a></h1>
</div>
<!--close-Header-part--> 


<!--top-Header-menu-->
<div id="user-nav" class="navbar navbar-inverse">
  <ul class="nav">
    <li  class="dropdown" id="profile-messages" ><a title="" href="#" data-toggle="dropdown" data-target="#profile-messages" class="dropdown-toggle"><i class="icon icon-user"></i>  <span class="text">Welcome User</span><b class="caret"></b></a>
      <ul class="dropdown-menu">
        <li><a href="#"><i class="icon-user"></i> My Profile</a></li>
        <li class="divider"></li>
        <li><a href="#"><i class="icon-check"></i> My Tasks</a></li>
        <li class="divider"></li>
        <li><a href="login.html"><i class="icon-key"></i> Log Out</a></li>
      </ul>
    </li>
    <li class="dropdown" id="menu-messages"><a href="#" data-toggle="dropdown" data-target="#menu-messages" class="dropdown-toggle"><i class="icon icon-envelope"></i> <span class="text">Messages</span> <span class="label label-important">5</span> <b class="caret"></b></a>
      <ul class="dropdown-menu">
        <li><a class="sAdd" title="" href="#"><i class="icon-plus"></i> new message</a></li>
        <li class="divider"></li>
        <li><a class="sInbox" title="" href="#"><i class="icon-envelope"></i> inbox</a></li>
        <li class="divider"></li>
        <li><a class="sOutbox" title="" href="#"><i class="icon-arrow-up"></i> outbox</a></li>
        <li class="divider"></li>
        <li><a class="sTrash" title="" href="#"><i class="icon-trash"></i> trash</a></li>
      </ul>
    </li>
    <li class=""><a title="" href="#"><i class="icon icon-cog"></i> <span class="text">Settings</span></a></li>
    <li class=""><a title="" href="logout.php"><i class="icon icon-share-alt"></i> <span class="text">Logout</span></a></li>
  </ul>
</div>
<!--close-top-Header-menu-->
<!--start-top-serch-->
<div id="search">
  <input type="text" placeholder="Search here..."/>
  <button type="submit" class="tip-bottom" title="Search"><i class="icon-search icon-white"></i></button>
</div>
<!--close-top-serch-->
<!--sidebar-menu-->
<div id="sidebar"><a href="#" class="visible-phone"><i class="icon icon-home"></i> Dashboard</a>
  <ul>

    <?php if(@$_SESSION['user_type']=='admin')
    {
    ?>
    <li class="active"><a href="index.html"><i class="icon icon-home"></i> <span>Dashboard</span></a> </li>
   
    <li class="submenu"> <a href="#"><i class="icon icon-th-list"></i> <span>Forms</span> <span class="label label-important"></span></a>
      <ul>
        <li><a href="add_data.php">Basic Form</a></li>
         <li><a href="view_data.php"><i class="icon icon-th"></i> <span>Tables</span></a></li>
      </ul>
    </li>

    <li class="submenu"> <a href="#"><i class="icon icon-th-list"></i> <span>Slider</span> <span class="label label-important"></span></a>
      <ul>
        <li><a href="add_slider.php">add slider</a></li>
         <li><a href="view_slider.php"><i class="icon icon-th"></i> <span>view slider</span></a></li>
      </ul>
    </li>

     <li class="submenu"> <a href="#"><i class="icon icon-th-list"></i> <span>Offer</span> <span class="label label-important"></span></a>
      <ul>
        <li><a href="add_offer.php">add offer</a></li>
         <li><a href="view_offer.php"><i class="icon icon-th"></i> <span>view offer</span></a></li>
      </ul>
    </li>

     <li class="submenu"> <a href="#"><i class="icon icon-th-list"></i> <span>saying</span> <span class="label label-important"></span></a>
      <ul>
        <li><a href="add_saying.php">add saying</a></li>
         <li><a href="view_saying.php"><i class="icon icon-th"></i> <span>view saying</span></a></li>
      </ul>
    </li>

     <li class="submenu"> <a href="#"><i class="icon icon-th-list"></i> <span>read</span> <span class="label label-important"></span></a>
      <ul>
        <li><a href="add_read.php">add read</a></li>
         <li><a href="view_read.php"><i class="icon icon-th"></i> <span>view read</span></a></li>
      </ul>
    </li>
<?php } else { ?>

 <li class="submenu"> <a href="#"><i class="icon icon-th-list"></i> <span>read</span> <span class="label label-important"></span></a>
      <ul>
        <li><a href="add_read.php">add read</a></li>
         <li><a href="view_read.php"><i class="icon icon-th"></i> <span>view read</span></a></li>
      </ul>
    </li>

  <?php } ?>

  </ul>
</div>  